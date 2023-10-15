import { StatusCodes } from "http-status-codes";
import User from "../models/jobModel.js";

export const userRegister = async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user: newUser });
};

export const userLogin = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  res.status(StatusCodes.OK).json({ user });
};
