import { Schema, model } from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
const reqString = { type: String, required: true };

const jobSchema = new Schema(
  {
    company: reqString,
    position: reqString,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
    },
    jobLocation: {
      ...reqString,
      minlength: 5,
    },
  },
  { timestamps: true }
);

export default model("Job", jobSchema);
