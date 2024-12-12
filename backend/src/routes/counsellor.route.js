import { Router } from "express";
//put js at the end whicle importing
import { registerCounsellor, loginCounsellor,logoutCounsellor} from "../controllers/counsellor.controller.js";
import { counsellorVerifyJWT } from "../middleware/counsellorauth.middleware.js";
import { verifyAdminRole } from "../middleware/adminauth.middleware.js";

const router = Router();

router.post('/register',verifyAdminRole,registerCounsellor); 
router.post('/login',loginCounsellor);
router.post('/logout',counsellorVerifyJWT,logoutCounsellor);

export default router;