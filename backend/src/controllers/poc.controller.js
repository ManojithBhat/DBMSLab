import { ApiError } from '../utils/ApiError.js';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Poc } from '../models/poc.model.js';
import { User } from '../models/user.model.js';

// Get all POCs
const getAllPocs = AsyncHandler(async (req, res) => {
  const pocs = await Poc.find().populate({ path: 'head', select: 'username email usn' });
  
  if (!pocs) {
    throw new ApiError(404, 'No POCs found');
  }

  res.status(200).json(new ApiResponse(200, pocs, 'POCs fetched successfully'));
});

// Update POC (Only Admin)
const updatePoc = AsyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    throw new ApiError(403, 'Unauthorized: Only admins can update POCs');
  }

  const { pocNumber, usn } = req.body;
  console.log(pocNumber,usn)

  const poc = await Poc.findById(pocNumber);
  if (!poc) {
    throw new ApiError(404, 'POC not found');
  }
  console.log(poc)

  if (usn) {
    const user = await User.findOne({usn});
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    poc.head = user._id;
  }
  console.log(usn)

  await poc.save();

  res.status(200).json(new ApiResponse(200, poc, 'POC updated successfully'));
});

export { getAllPocs, updatePoc };
