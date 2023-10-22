import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const state = await connect(process.env.MONGO_URI);
    console.log(`MongoDB connected to ${state.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
