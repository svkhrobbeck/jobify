import { Schema, model } from "mongoose";

const reqString = { type: String, required: true };

const userSchema = new Schema({});

export default model("User", userSchema);
