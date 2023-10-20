import { Form, useNavigation, redirect, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import customAxios from "../utils/customAxios";
import { FormRow, FormRowSelect } from "../components";
import { toast } from "react-toastify";
import checkToastThemeOption from "../utils/checkToastThemeOption";

export const addJobAction = async ({ request }) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);
  const option = checkToastThemeOption();

  try {
    await customAxios.post("/jobs", payload);
    toast.success("Job added successfully", option);
    return redirect("all-jobs");
  } catch (err) {
    toast.error(err?.response?.data?.msg, option);
    return err;
  }
};

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form className="form" method="POST">
        <h4 className="form-title">Add Job</h4>

        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow type="text" labelText="job location" name="jobLocation" defaultValue={user.location} />

          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={Object.values(JOB_STATUS)}
            defaultValue={JOB_STATUS.PENDING}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={Object.values(JOB_TYPE)}
            defaultValue={JOB_TYPE.FULL_TIME}
          />

          <button type="submit" className="btn btn-block form-btn " disabled={isSubmitting}>
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
