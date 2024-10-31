import express from "express";
import incidentRoutes from "./routes/incident.routes.js";
import userRoutes from "./routes/user.routes.js";
import communityRoutes from "./routes/community.routes.js";
import commerceRoutes from "./routes/commerce.routes.js";
import cors from "cors";

const app = express();
app.get("/", (req, res) => {
    res.send("Hello from Dashabhuja Backend!");
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:'*'
}));

app.use("/api/v1/incident", incidentRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/community", communityRoutes);
app.use('/api/v1/commerce', commerceRoutes);


export default app;