import Joi from "joi";

export const createMetaDataSchema = {
  body: Joi.object({
    maxSubmissionsPerSession: Joi.number(),
    maxCharactersPerSubmission: Joi.number(),
    sessionCooldownSeconds: Joi.number(),
    backgroundResetSeconds: Joi.number(),
    idleResetSeconds: Joi.number(),
    systemPrompt: Joi.string(),
  }),
};

export const updateMetaDataSchema = {
  body: Joi.object({
    maxSubmissionsPerSession: Joi.number(),
    maxCharactersPerSubmission: Joi.number(),
    sessionCooldownSeconds: Joi.number(),
    backgroundResetSeconds: Joi.number(),
    idleResetSeconds: Joi.number(),
    systemPrompt: Joi.string(),
  }).min(1),
};

