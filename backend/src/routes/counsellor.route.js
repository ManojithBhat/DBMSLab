import { Router } from "express";
//put js at the end whicle importing
import { registerCounsellor } from "../controllers/counsellor.controller.js";

const router = Router();

router.post('/register',registerCounsellor); 

export default router;