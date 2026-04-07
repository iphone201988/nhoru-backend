import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    maxSubmissionsPerSession: {
      type: Number,
    },
    maxCharactersPerSubmission: {
      type: Number,
    },
    sessionCooldownSeconds: {
      type: Number,
    },
    backgroundResetSeconds: {
      type: Number,
    },
    idleResetSeconds: {
      type: Number,
    },
    aiModel: {
      type: String,
      enum: ["gpt-4o-mini", "gpt-3.5-turbo"],
    },
    systemPrompt: {
      type: String,
    },
  },
  { timestamps: true }
);

const MetaData = mongoose.model("MetaData", schema);
export default MetaData;

