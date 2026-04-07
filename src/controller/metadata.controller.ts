import { Request, Response } from "express";
import { TryCatch, SUCCESS } from "../utils/helper";
import ErrorHandler from "../utils/ErrorHandler";
import MetaData from "../model/metadata.model";

const createMetaData = TryCatch(async (req: Request, res: Response) => {
  const exists = await MetaData.findOne();
  if (exists) throw new ErrorHandler("MetaData already exists.", 400);

  const payload = req.body || {};
  const metaData = await MetaData.create(payload);

  return SUCCESS(res, 201, "MetaData created successfully.", { metaData });
});

const getMetaData = TryCatch(async (req: Request, res: Response) => {
  const metaData = await MetaData.findOne();
  if (!metaData) throw new ErrorHandler("MetaData not found.", 404);

  return SUCCESS(res, 200, "MetaData fetched successfully.", { metaData });
});

const updateMetaData = TryCatch(async (req: Request, res: Response) => {
  const metaData = await MetaData.findOne();
  if (!metaData) throw new ErrorHandler("MetaData not found.", 404);

  const updated = await MetaData.findByIdAndUpdate(metaData._id, req.body, {
    new: true,
  });

  return SUCCESS(res, 200, "MetaData updated successfully.", {
    metaData: updated,
  });
});

const deleteMetaData = TryCatch(async (req: Request, res: Response) => {
  const metaData = await MetaData.findOne();
  if (!metaData) throw new ErrorHandler("MetaData not found.", 404);

  await MetaData.findByIdAndDelete(metaData._id);
  return SUCCESS(res, 200, "MetaData deleted successfully.");
});

export default {
  createMetaData,
  getMetaData,
  updateMetaData,
  deleteMetaData,
};

