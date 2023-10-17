import { Schema, model } from "mongoose";
import { USER_ROLE } from "../utils/constants.js";

const reqString = { type: String, required: true };

const userSchema = new Schema({
  name: reqString,
  lastName: reqString,
  password: reqString,
  location: reqString,
  email: { ...reqString, unique: true },
  role: {
    type: String,
    enum: USER_ROLE,
    default: USER_ROLE.USER,
  },
});

export default model("User", userSchema);
