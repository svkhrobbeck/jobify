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
  const obj = filterObjectUtil(req.body, "password");

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ msg: "user updated" });
};
