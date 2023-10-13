import Job from "../models/jobModel.js";
import { isValidObjectId } from "mongoose";

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json({ jobs });
};

// CREATE A JOB
export const createJob = async (req, res) => {
  const { position, company, jobLocation } = req.body;

  if (!position.trim() || !company.trim()) {
    return res.status(400).json({ msg: "Company and position are required" });
  }

  if (jobLocation !== undefined && jobLocation.length < 5) {
    return res.status(400).json({ msg: "Location must be at least 5 characters long" });
  }

  const job = await Job.create(req.body);
  res.status(201).json({ job });
};

// GET SINGLE JOB
export const getSingleJob = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ msg: `invalid id` });
  }

  const job = await Job.findById(id);

  if (!job) {
    return res.status(404).json({ msg: `no job with id: ${id}` });
  }

  res.status(200).json({ job });
};

// EDIT JOB
export const editJob = async (req, res) => {
};

// DELETE JOB
export const deleteJob = async (req, res) => {
};
