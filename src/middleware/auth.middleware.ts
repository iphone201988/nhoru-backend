import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TryCatch } from "../utils/helper";
import ErrorHandler from "../utils/ErrorHandler";
import User from "../model/user.model";

export const authenticationMiddleware = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) throw new ErrorHandler("Please login again.", 401);

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const admin = await User.findById(decoded?._id);

    if (!admin || admin.role !== "admin")
      throw new ErrorHandler("Unauthorized.", 401);

    (req as any).admin = admin;
    next();
  }
);

