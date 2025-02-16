import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import jwt, { decode } from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const verifyAdminRole = AsyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer', '');

    if (!token) {
      return new ApiError(401, 'Unauthorized request');
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const email = decodedToken?.email;

    const user = await User.findOne({ email }).select(
      '-password -refreshToken'
    );

    if (!user) {
      throw new ApiError(401, 'Invalid Access');
    }

    if (user.role !== 'admin') {
      throw new ApiError(401, 'Unauthorised Access');
    }

    req.user = user;

    next();
  } catch (err) {
    throw new ApiError(401, err?.message || 'invalid access token');
  }
});