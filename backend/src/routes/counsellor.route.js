import { Router } from "express";
//put js at the end whicle importing
import { registerCounsellor, loginCounsellor,logoutCounsellor } from "../controllers/counsellor.controller.js";
import {verifyJWT} from '../middleware/auth.middleware.js'

const router = Router();

router.post('/register',registerCounsellor); 
router.post('/login',loginCounsellor);
router.post('/logout',verifyJWT,logoutCounsellor);

export default router;