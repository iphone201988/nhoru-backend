import express from "express";
import userController from "../controller/user.controller";
import validate from "../middleware/validate.middleware";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import { aiChatSchema, createAdminSchema, loginAdminSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/admin", validate(createAdminSchema), userController.createAdmin);
router.post("/login", validate(loginAdminSchema), userController.loginAdmin);
router.post("/ai", validate(aiChatSchema), userController.aiChat);

router.use(authenticationMiddleware);
router.get("/admin", userController.getAdmin);

export default router;

