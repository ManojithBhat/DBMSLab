import { Router } from "express";
//put js at the end whicle importing
import { addEvent,updateEvent,deleteEvent } from "../controllers/event.controller.js";
import { verifyAdminRole } from "../middleware/adminauth.middleware.js";

const router = Router();

router.post("/addevent",verifyAdminRole,addEvent);
router.post('/updateEvent/:id',verifyAdminRole,updateEvent)
router.delete('/deleteEvent/:id',verifyAdminRole,deleteEvent)

export default router;