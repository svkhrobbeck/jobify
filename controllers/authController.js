import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";

export const register = async (req, res) => {
  console.log(req.body);
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  res.status(StatusCodes.OK).json({ user });
};
