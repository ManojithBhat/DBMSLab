import { Router } from "express";
//put js at the end whicle importing
import {register, registerUser,loginUser,logoutUser} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

/* Signup route - POST request 
Filed should contains : email, password and usn */
router.post('/signup',registerUser);

/* Register Route- POST request
Field should contain : Name, departement, Counsellor -  */
router.post('/register',verifyJWT,register); 
router.post('/login',loginUser);
router.post('/logout',logoutUser);


export default router;