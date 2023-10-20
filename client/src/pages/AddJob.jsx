import { Form, redirect, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import customAxios from "../utils/customAxios";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
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
    const errors = err?.response?.data?.msg.split(",");
    errors.forEach(err => toast.error(err, option));
    return err;
  }
};

const AddJob = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form className="form" method="POST">
        <h4 className="form-title">Add Job</h4>

        <div className="form-center">
          <FormRow name="position" />
          <FormRow name="company" />
          <FormRow labelText="job location" name="jobLocation" defaultValue={user.location} />

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
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
