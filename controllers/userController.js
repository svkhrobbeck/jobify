import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";
import filterObjectUtil from "../utils/filterObjectUtil.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId);
  const filteredUser = user.filterJSON("password");

  res.status(StatusCodes.OK).json({ user: filteredUser });
};

export const updateUser = async (req, res) => {
  const obj = filterObjectUtil(req.body, "password", "role");

  await User.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ msg: "user updated" });
};

export const getApplicationStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalJobs = await Job.countDocuments();

  res.status(StatusCodes.OK).json({ totalUsers, totalJobs });
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.user.userId);
  res.status(StatusCodes.OK).json({ msg: "user deleted" });
};
