import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const filteredUser = user.filterJSON("password");
  res.status(StatusCodes.OK).json({ user: filteredUser });
};
