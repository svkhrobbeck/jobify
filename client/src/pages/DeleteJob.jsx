import { toast } from "react-toastify";
import customAxios from "../utils/customAxios";
import checkToastThemeOption from "../utils/checkToastThemeOption";
import { redirect } from "react-router-dom";

export const deleteJobAction = async ({ params }) => {
  const option = checkToastThemeOption();

  try {
    await customAxios.delete(`/jobs/${params.id}`);
    toast.success("Job deleted successfully", option);
  } catch (err) {
    const errors = err?.response?.data?.msg.split(",");
    errors.forEach(err => toast.error(err, option));
  }

  return redirect("../all-jobs");
};
