import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const connectToDB = () => mongoose.connect(process.env.MONGO_URI as string);

export const TryCatch =
  (func: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(func(req, res, next)).catch(next);

export const generateJwtToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string);
};

type ResponseData = Record<string, any>;

export const SUCCESS = (
  res: Response,
  status: number,
  message: string,
  data?: ResponseData
): ResponseData => {
  return res.status(status).json({
    success: true,
    message,
    ...(data ? data : {}),
  });
};

