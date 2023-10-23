import { FormRow, FormRowSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_TYPE } from "../utils/constants";
import { useAllJobsContext } from "../pages/AllJobs";

const SearchContainer = () => {
  const { data } = useAllJobsContext();

  return (
    <Wrapper>
      <Form>
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow type="search" name="search" />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue="all"
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue="all"
          />
          <FormRowSelect
            name="sort"
            list={Object.values(JOB_SORT_TYPE)}
            defaultValue="newest"
          />
          <Link className="btn form-btn delete-btn" to="/dashboard/all-jobs">
            Reset Search Values
          </Link>
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
