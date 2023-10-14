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
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "Tashkent",
      minlength: 5,
    },
  },
  { timestamps: true }
);

export default model("Job", jobSchema);
