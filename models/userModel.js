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
    ...reqString,
    enum: USER_ROLE,
  },
});

export default model("User", userSchema);
