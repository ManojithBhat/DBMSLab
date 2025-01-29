import { Router } from 'express';
//put js at the end whicle importing
import { getUserProfile, getProfile } from '../controllers/user.controller.js';
import { counsellorVerifyJWT } from '../middleware/counsellorauth.middleware.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { getCounsellorProfile } from '../controllers/counsellor.controller.js';

const router = Router();

router.get('/profile', verifyJWT, getUserProfile);
router.get('/counsellor/profile', counsellorVerifyJWT, getCounsellorProfile);
router.get('/profile/:usn', counsellorVerifyJWT, getProfile);
router.get('/admin/profile/:usn',verifyJWT, getProfile);

export default router;
