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

export const editJobAction = async ({ request, params }) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);
  const option = checkToastThemeOption();

  try {
    await customAxios.patch(`/jobs/${params.id}`, payload);
    toast.success("Job edited successfully", option);
    return redirect("../all-jobs");
  } catch (err) {
    toast.error(err?.response?.data?.msg, option);
    return err;
  }
};

const EditJob = () => {
  const { job } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form className="form" method="POST">
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow name="position" defaultValue={job.position} />
          <FormRow name="company" defaultValue={job.company} />
          <FormRow labelText="job location" name="jobLocation" defaultValue={job.jobLocation} />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={Object.values(JOB_STATUS)}
            defaultValue={job.jobStatus}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={Object.values(JOB_TYPE)}
            defaultValue={job.jobType}
          />
          <button className="btn btn-block form-btn" disabled={isSubmitting}>
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
