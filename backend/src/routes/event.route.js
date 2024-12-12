import { Router } from "express";
//put js at the end whicle importing
import { addEvent,updateEvent,deleteEvent,getEvent,getEventDetails,addEventUsers } from "../controllers/event.controller.js";
import { verifyAdminRole } from "../middleware/adminauth.middleware.js";

const router = Router();

router.get("/events",getEvent);
router.get("/events/:eventId",getEventDetails);


//protected route 
router.post("/addevent",verifyAdminRole,addEvent);
router.post('/updateEvent/:id',verifyAdminRole,updateEvent);
router.delete('/deleteEvent/:id',verifyAdminRole,deleteEvent);
router.post('/addVolunteer/:eventId',verifyAdminRole,addEventUsers)

export default router;