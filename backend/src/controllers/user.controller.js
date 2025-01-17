import { ApiError } from '../utils/ApiError.js';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';
import { Counsellor } from '../models/counsellor.model.js';
import { Event } from '../models/event.model.js';
import { Poc } from '../models/poc.model.js';
import jwt from 'jsonwebtoken';

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    //find the user in the database
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefrestToken();
    //there are methods
    user.refreshToken = refreshToken;
    //mongoose will not validate the fields before saving
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(
      500,
      'Something went wrong while generating refresh and access tokens'
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

const registerUser = AsyncHandler(async (req, res) => {
  //get email and password field from the req.body
  const { email, usn, password } = req.body;

  //check for the null fields { backend validation }
  if (email === '' || password === '' || usn === '')
    throw new ApiError(400, 'Either username or password is not there ');

  //check for the existing user
  const existedUser = await User.findOne({
    $or: [{ email: email }, { usn: usn }],
  });

  // HTTP 409 conflict status code indicates that clients request conflict
  if (existedUser) {
    throw new ApiError(409, 'User already existed');
  }

  //create the new user in the database
  const user = await User.create({
    usn: usn,
    email: email,
    password: password,
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  if (!createdUser) {
    throw new ApiError(
      500,
      'There was an error while creating the user in the database'
    );
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  //cookie are modifiable by only server and not the frontend
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(201)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: createdUser, accessToken, refreshToken },
        'User created and logged in successfully'
      )
    );
});

/* Its a protected route */
/*
This route will be asking for the complete details of the user and adding in the database 
*/
const register = AsyncHandler(async (req, res) => {
  const { username, department, poc, role, counsellor } = req.body;
  console.log(username, department, poc, role, counsellor);
  // Validate that required fields are provided in the request body
  if ([username, department, role, counsellor].some((field) => !field)) {
    throw new ApiError(400, 'All fields are required ');
  }

  // If the role is 'volunteer', poc should be provided
  if (role === 'volunteer' && !poc) {
    throw new ApiError(400, 'POC is required for volunteers ');
  }

  const user = await User.findById(req.user._id); // Find user based on their ID

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Fetch the counsellor from the database using the counsellor code
  const counsellorId = await Counsellor.findOne({ code: counsellor });

  if (!counsellorId) {
    throw new ApiError(404, 'No counsellor with the given code');
  }

  let pocId = null; // Default pocId to null

  if (role === 'volunteer' || role === 'admin') {
    pocId = await Poc.findOne({ pocNumber: poc });

    if (!pocId) {
      throw new ApiError(404, 'No POC with the given Poc number');
    }
  }

  // Update user details
  console.log(pocId);
  user.username = username;
  user.department = department;
  user.counsellorId = counsellorId._id;
  user.role = role;
  user.poc = null;

  if ((role === 'volunteer' || role === 'admin') && !pocId) {
    user.poc = pocId._id;
  }

  await user.save({ validateBeforeSave: true });

  res
    .status(200)
    .json(new ApiResponse(200, user, 'User details updated successfully'));
});

const loginUser = AsyncHandler(async (req, res) => {
  /* request body ->data */
  /* get username or email/ */
  /* find the user */
  /* compare password */
  /* access and refresh token */
  /* send cookies */

  const { email, password, usn } = req.body;
  if (!(email || usn)) {
    throw new ApiError(400, 'email or usn is required');
  }

  const user = await User.findOne({
    $or: [{ email }, { usn }],
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

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );
  //console.log(loggedInUser)

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

const logoutUser = AsyncHandler(async (req, res) => {
  //to log out we have to clear cookies at the user end and also remove the refresh token from the db
  await User.findByIdAndUpdate(
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

    const user = await User.findById(decodedToken?._id);

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

const getUserProfile = AsyncHandler(async (req, res) => {
  const usn = req.user.usn;
  // Assuming the user's `usn` is available in `req.user`

  if (!usn) {
    throw new ApiError(400, 'USN is missing');
  }

  // Find the user by their USN and populate the events they participated in
  const user = await User.findOne({ usn })
    .populate({
      path: 'participated',
      select: 'eventName date location description activityPoints',
    })
    .populate({
      path: 'poc',
      select: 'pocNumber pocName',
    })
    .populate({
      path: 'counsellorId',
      select: 'username department email',
    })
    .exec();

  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  res.status(200).json(new ApiResponse(200, user, 'User fetched successfully'));
});

const getProfile = AsyncHandler(async (req, res) => {
  // Assuming the user's `usn` is available in `req.user`
  const { usn } = req.params;

  if (!usn) {
    throw new ApiError(400, 'USN is missing');
  }

  // Find the user by their USN and populate the events they participated in
  const user = await User.findOne({ usn })
    .populate({
      path: 'participated',
      select: 'eventName date location description',
    })
    .populate({
      path: 'poc',
      select: 'pocNumber pocName',
    })
    .populate({
      path: 'counsellorId',
      select: 'username department email',
    })
    .exec();

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json(new ApiResponse(200, user, 'User fetched successfully'));
});

const checkAdmin = AsyncHandler(async (req, res) => {
  const usn = req.user.usn;
  // Assuming the user's `usn` is available in `req.user`

  if (!usn) {
    throw new ApiError(400, 'USN is missing');
  }

  const user = await User.findOne({ usn });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res
    .status(200)
    .json(new ApiResponse(200, user.role, 'User fetched successfully'));
});

export {
  register,
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  refreshAccessToken,
  getProfile,
  checkAdmin,
};
