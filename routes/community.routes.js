import { Router } from "express";
import {  createPost, getPosts } from "../controller/community.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/get").get(getPosts);
router.route("/create").post(upload.single("imageIncident"), createPost);

export default router