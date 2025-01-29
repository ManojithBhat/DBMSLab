import { ApiError } from '../utils/ApiError.js';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Counsellor } from '../models/counsellor.model.js';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    //find the user in the database
    const counsellor = await Counsellor.findByIdAndUpdate(userId);
    const accessToken = counsellor.generateAccessToken();
    const refreshToken = counsellor.generateRefreshToken();
    console.log(accessToken, refreshToken);
    //there are methods
    counsellor.refreshToken = refreshToken;
    //mongoose will not validate the fields before saving
    await counsellor.save({ valiateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(
      500,
      'Something went wrong while generating regresh and access tokens'
    );
  }
};

/*
Will get the user details from the frontend
validation has to be done here for the email and password.
first need to check if the user alreay exist 
if present then return a message saying that user already exist
else create the object - create a entry in the db
check for the user creation 
return the response 
*/

const registerCounsellor = AsyncHandler(async (req, res) => {
  // Get all fields from the req.body
  const { email, password, username, department, code } = req.body;

  // Check for null fields (backend validation)
  if (
    [email, password, username, department, code].some(
      (field) => field?.trim() === ''
    )
  ) {
    throw new ApiError(400, 'All fields are required');
  }

  // Check for existing user
  const existingUser = await Counsellor.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, 'User with this email already exists');
  }

  // Create the new counsellor in the database with all information
  const counsellor = await Counsellor.create({
    email,
    password,
    username,
    department,
    code,
  });

  // Fetch the created counsellor without sensitive information
  const createdCounsellor = await Counsellor.findById(counsellor._id).select(
    '-password'
  );

  if (!createdCounsellor) {
    throw new ApiError(
      500,
      'There was an error while creating the counsellor in the database'
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: createdCounsellor },
        'Counsellor Created and LoggedIn in successfully'
      )
    );
});

const loginCounsellor = AsyncHandler(async (req, res) => {
  /* request body ->data */
  /* get username or email/ */
  /* find the user */
  /* compare password */
  /* access and refresh token */
  /* send cookies */

  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, 'email is required');
  }

  const user = await Counsellor.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  //the user defined method in user.model.js so we should use user and if it is of mongoose then User

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(404, 'Invalid user credentials');
  }

  //user is valid and now we need to generate access and refresh token for the user
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await Counsellor.findById(user._id).select(
    '-password -refreshToken'
  );

  //cookie are modifiable by only server and not the frontend
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        'User logged in successfully'
      )
    );
});

const logoutCounsellor = AsyncHandler(async (req, res) => {
  //to log out we have to clear cookies at the user end and also remove the refresh token from the db
  await Counsellor.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      //the response we get back will be the new updated value
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {}, 'User logged out successfully'));
});

const refreshAccessToken = AsyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, 'Unauthorized request');
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await Counsellor.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    if (user?.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, 'Refresh token is expired or used');
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, newRefreshToken },
          'Access token refreshed'
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid refresh token');
  }
});

const getCounsellorProfile = AsyncHandler(async (req, res) => {
  const email = req.user.email;
  if (!email) {
    throw new ApiError(400, 'Email is missing ');
  }

  const counsellor = await Counsellor.findOne({ email: email });

  if (!counsellor) {
    throw new ApiError(404, 'Counsellor not found');
  }

  //if the counsellor is found then query the user database for the counsellorId

  const students = await User.find({ counsellorId: counsellor._id });

  const response = {
    counsellor,
    students,
  };
  res
    .status(200)
    .json(new ApiResponse(200, response, 'User fetched successfully'));
});

export {
  registerCounsellor,
  loginCounsellor,
  logoutCounsellor,
  getCounsellorProfile,
  refreshAccessToken,
};
