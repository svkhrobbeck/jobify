import Job from "../models/jobModel.js";

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json({ jobs });
};

// CREATE A JOB
export const createJob = async (req, res) => {
};

// GET SINGLE JOB
export const getSingleJob = async (req, res) => {
};

// EDIT JOB
export const editJob = async (req, res) => {
};

// DELETE JOB
export const deleteJob = async (req, res) => {
};
