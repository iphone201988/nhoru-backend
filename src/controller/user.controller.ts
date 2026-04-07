import { Request, Response } from "express";
import { generateJwtToken, TryCatch, SUCCESS } from "../utils/helper";
import ErrorHandler from "../utils/ErrorHandler";
import User from "../model/user.model";
import bcrypt from "bcryptjs";
import MetaData from "../model/metadata.model";

const createAdmin = TryCatch(async (req: Request, res: Response) => {
  const adminExists = await User.findOne({ role: "admin" });
  if (adminExists) throw new ErrorHandler("Admin user already exists.", 400);

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const admin = await User.create({
    email: req.body.email,
    password: hashedPassword,
    role: "admin",
  });

  const safeAdmin = admin.toObject();
  delete (safeAdmin as any).password;
  return SUCCESS(res, 201, "Admin created successfully.", { admin: safeAdmin });
});

const getAdmin = TryCatch(async (req: Request, res: Response) => {
  const admin = await User.findOne({ role: "admin" });
  if (!admin) throw new ErrorHandler("Admin user not found.", 404);

  return SUCCESS(res, 200, "Admin fetched successfully.", { admin });
});

const loginAdmin = TryCatch(async (req: Request, res: Response) => {
  const admin = await User.findOne({ role: "admin", email: req.body.email }).select(
    "+password"
  );
  if (!admin) throw new ErrorHandler("Invalid credentials.", 400);

  const storedPassword = admin.password || "";
  const looksHashed = storedPassword.startsWith("$2a$") || storedPassword.startsWith("$2b$");

  if (looksHashed) {
    const isMatch = await bcrypt.compare(req.body.password, storedPassword);
    if (!isMatch) throw new ErrorHandler("Invalid credentials.", 400);
  } else {
    if (storedPassword !== req.body.password)
      throw new ErrorHandler("Invalid credentials.", 400);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    admin.password = hashedPassword;
    await admin.save();
  }

  const token = generateJwtToken({ _id: admin._id, role: admin.role });

  const safeAdmin = admin.toObject();
  delete (safeAdmin as any).password;
  return SUCCESS(res, 200, "Login successful.", { token, admin: safeAdmin });
});

const aiChat = TryCatch(async (req: Request, res: Response) => {
  const metaData = await MetaData.findOne().select("systemPrompt aiModel");
  const systemPrompt = metaData?.systemPrompt;

  if (!systemPrompt) throw new ErrorHandler("System prompt not found.", 404);

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new ErrorHandler("AI is not configured.", 500);

  const endpoint =
    process.env.OPENAI_ENDPOINT || "https://api.openai.com/v1/chat/completions";
  const model = metaData?.aiModel || process.env.OPENAI_MODEL || "gpt-4o-mini";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: req.body.message },
      ],
    }),
  });

  const json: any = await response.json().catch(() => null);

  if (!response.ok) {
    const msg =
      json?.error?.message || json?.message || "AI request failed.";
    throw new ErrorHandler(msg, 400);
  }

  const reply = json?.choices?.[0]?.message?.content;
  if (!reply) throw new ErrorHandler("AI response was empty.", 400);

  return SUCCESS(res, 200, "AI response fetched successfully.", { reply });
});

export default {
  createAdmin,
  getAdmin,
  loginAdmin,
  aiChat,
};

