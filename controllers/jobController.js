import { StatusCodes } from "http-status-codes";
import Job from "../models/jobModel.js";
import { NotFoundError } from "../errors/customError.js";

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  res.status(StatusCodes.OK).json({ jobs });
};

// CREATE A JOB
export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// GET SINGLE JOB
export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) throw new NotFoundError(`no job with id: ${id}`);
  res.status(200).json({ job });
};

// EDIT JOB
export const editJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });

  if (!updatedJob) throw new NotFoundError(`no job with id: ${id}`);
  res.status(StatusCodes.OK).json({ job: updatedJob });
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  if (!removedJob) throw new NotFoundError(`no job with id: ${id}`);
  res.status(StatusCodes.OK).json({ msg: "deleted", job: removedJob });
};
