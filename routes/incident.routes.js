import { Router } from "express";
import { createIncident, getIncidents } from "../controller/incident.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.route("/get").get(getIncidents);
router.route("/create").post(upload.single("imageIncident"), createIncident);

export default router