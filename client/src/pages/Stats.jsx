import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import checkToastThemeOption from "../utils/checkToastThemeOption";
import customAxios from "../utils/customAxios";
import { ChartsContainer, StatsContainer } from "../components";

export const statsLoader = async () => {
  try {
    const { data } = await customAxios.get("/jobs/data/stats");
    return data;
  } catch (err) {
    const errors = err?.response?.data?.msg.split(",");
    errors.forEach(err => toast.error(err, checkToastThemeOption()));
    return err;
  }
};

const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && <ChartsContainer data={monthlyApplications} />}
    </>
  );
};
export default Stats;
