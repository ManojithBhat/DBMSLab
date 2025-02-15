import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import jwt, { decode } from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { Counsellor } from '../models/counsellor.model.js';

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

    const counsellor = await Counsellor.findOne({email}).select(
      '-password -refreshToken'
    );

    console.log(counsellor)
    if (!user || !counsellor) {
      throw new ApiError(401, 'Invalid Access');
    }

    
    if (user.role !== 'admin') {
      throw new ApiError(401, 'Unauthorised Access');
    }

    req.user = user || counsellor;

    next();
  } catch (err) {
    throw new ApiError(401, err?.message || 'invalid access token');
  }
});
