import { Router } from "express";
import { createBooking, listAvailability, listClientBookings, listServices } from "../controllers/bookingController.js";
const router = Router();
router.get("/services", listServices);
router.get("/availability", listAvailability);
router.post("/bookings", createBooking);
router.get("/bookings", listClientBookings);
export default router;
