import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

// we use _ when response is not used in the function
export const verifyJWT = AsyncHandler(async (req, res, next) => {
  //request made by the client has the cookie and we access with the help of the cookie-parser
  //in case of the authorisation header in case of mobile application

  try {
    const token =
      req.cookies?.accessToken ||
      req.headers('Authorization')?.replace('Bearer ', '');

    //401 - lacks authentication
    if (!token) {
      throw new ApiError(401, 'Unauthorized request');
    }

    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const email = decodeToken?.email;
    const user = await User.findOne({ email }).select(
      '-password -refreshToken'
    );
    if (!user) {
      throw new ApiError(404, 'Invalid Access Token');
    }

    //it is a middleware so we have to pass the user to the next middleware

    req.user = user;
    next();
  } catch (err) {
    throw new ApiError(401, 'Invalid access token');
  }
});
