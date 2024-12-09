import { Router } from "express";
//put js at the end whicle importing
import { registerUser} from "../controllers/user.controller.js";

const router = Router();

router.post('/register',registerUser); 

export default router;