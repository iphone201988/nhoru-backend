import express from "express";
import userRoutes from "./user.routes";
import metaDataRoutes from "./metadata.routes";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/metadata", metaDataRoutes);

export default router;

