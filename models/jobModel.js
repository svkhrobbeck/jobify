import { Schema, model } from "mongoose";

const reqString = { type: String, required: true };

const jobSchema = new Schema(
  {
    company: reqString,
    position: reqString,
    jobStatus: {
      type: String,
      enum: ["pending", "interview", "declined"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
  },
  { timestamps: true }
);

export default model("Job", jobSchema);
