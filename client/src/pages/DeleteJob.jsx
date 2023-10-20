import { toast } from "react-toastify";
import customAxios from "../utils/customAxios";
import checkToastThemeOption from "../utils/checkToastThemeOption";
import { redirect } from "react-router-dom";

export const deleteJobAction = async ({ params }) => {
  const option = checkToastThemeOption();

  try {
    await customAxios.delete(`/jobs/${params.id}`);
    toast.success("Job deleted successfully", option);
    return redirect("../all-jobs");
  } catch (err) {
    toast.error(err?.response?.data?.msg, option);
    return err;
  }
};
