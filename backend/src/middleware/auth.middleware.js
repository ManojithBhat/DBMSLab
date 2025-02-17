import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { Counsellor } from '../models/counsellor.model.js';

export const verifyJWT = AsyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Unauthorized request');
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const email = decodedToken?.email;

    // Try to find the user in the admin collection (User model)
    let user = await User.findOne({ email }).select('-password -refreshToken');

    // If not found, try to find the user in the counsellor collection
    if (!user) {
      user = await Counsellor.findOne({ email }).select(
        '-password -refreshToken'
      );
    }

    if (!user) {
      throw new ApiError(401, 'Invalid Access');
    }

    req.user = user;
    next();
  } catch (err) {
    throw new ApiError(401, err?.message || 'Invalid access token');
  }
});
