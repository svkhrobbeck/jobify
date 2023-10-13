import Job from "../models/jobModel.js";

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
};

// EDIT JOB
export const editJob = async (req, res) => {
};

// DELETE JOB
export const deleteJob = async (req, res) => {
};
