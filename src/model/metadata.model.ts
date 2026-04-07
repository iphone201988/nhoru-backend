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
    systemPrompt: {
      type: String,
    },
  },
  { timestamps: true }
);

const MetaData = mongoose.model("MetaData", schema);
export default MetaData;

