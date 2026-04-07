import Joi from "joi";

export const createAdminSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
};

export const loginAdminSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
};

export const aiChatSchema = {
  body: Joi.object({
    message: Joi.string().trim().min(1).required(),
  }),
};

