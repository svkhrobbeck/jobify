import { toast } from "react-toastify";
import checkToastThemeOption from "../utils/checkToastThemeOption";
import customAxios from "../utils/customAxios";
import { Form, useNavigation, redirect, useLoaderData } from "react-router-dom";
import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";

export const editJobLoader = async ({ params }) => {
  try {
    const { data } = await customAxios.get(`/jobs/${params.id}`);
    return data;
  } catch (err) {
    toast.error(err?.response?.data?.msg, checkToastThemeOption());
    return err;
  }
};

export const editJobAction = async ({ request }) => {
};

const EditJob = () => {
  return <div>EditJob</div>;
};
export default EditJob;
