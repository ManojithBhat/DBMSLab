import { Router } from "express";
//put js at the end whicle importing
import { registerCounsellor, loginCounsellor,logoutCounsellor } from "../controllers/counsellor.controller.js";

const router = Router();

router.post('/register',registerCounsellor); 
router.post('/login',loginCounsellor);
router.post('/logout',logoutCounsellor);

export default router;