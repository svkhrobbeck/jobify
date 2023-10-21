import { toast } from "react-toastify";
import checkToastThemeOption from "../utils/checkToastThemeOption";
import customAxios from "../utils/customAxios";
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
  return <div>Stats</div>;
};
export default Stats;
