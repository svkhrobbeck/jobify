import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { useLoaderData, redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/StatsContainer";
import customAxios from "../utils/customAxios";
import checkToastThemeOption from "../utils/checkToastThemeOption";
import { StatItem } from "../components";

export const adminLoader = async () => {
  try {
    const { data } = await customAxios.get("/users/admin/statistics");
    return data;
  } catch (err) {
    toast.error(err?.response?.data?.msg, checkToastThemeOption());
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { totalJobs, totalUsers } = useLoaderData();

  return (
    <Wrapper>
      <StatItem
        count={totalUsers}
        title="current users"
        color="#e9b949"
        bgColor="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem count={totalJobs} title="total jobs" color="#647acb" bgColor="#e0e8f9" icon={<FaCalendarCheck />} />
    </Wrapper>
  );
};
export default Admin;
