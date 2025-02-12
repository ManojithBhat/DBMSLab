import { Router } from 'express';
import { getAllPocs, updatePoc } from "../controllers/poc.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/list-poc", getAllPocs); // Protected route
router.post("/update-poc-head", verifyJWT, updatePoc);

export default router;
