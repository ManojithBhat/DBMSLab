import { Router } from "express";
//put js at the end whicle importing
import {register, registerUser,loginUser,logoutUser} from "../controllers/user.controller.js";

const router = Router();

router.post('/signup',register);
router.post('/register',registerUser); 
router.post('/login',loginUser);
router.post('/logout',logoutUser);


export default router;