import express from "express";
import metaDataController from "../controller/metadata.controller";
import validate from "../middleware/validate.middleware";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import {
  createMetaDataSchema,
  updateMetaDataSchema,
} from "../schema/metadata.schema";

const router = express.Router();

router.post(
  "/",
  authenticationMiddleware,
  validate(createMetaDataSchema),
  metaDataController.createMetaData,
);
router.get("/", metaDataController.getMetaData);
router.put(
  "/",
  authenticationMiddleware,
  validate(updateMetaDataSchema),
  metaDataController.updateMetaData,
);
router.delete("/", authenticationMiddleware, metaDataController.deleteMetaData);

export default router;
