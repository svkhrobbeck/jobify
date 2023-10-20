import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { useLoaderData, redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/StatsContainer";
import customAxios from "../utils/customAxios";

export const adminLoader = async () => {
  try {
    const { data } = await customAxios.get("/users/admin/statistics");
    return data;
  } catch (err) {
    toast.error(err?.response?.data?.msg);
    return redirect("/dashboard");
  }
};

const Admin = () => {
};
export default Admin;
