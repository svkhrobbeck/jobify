import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_TYPE } from "../utils/constants";
import { useAllJobsContext } from "../pages/AllJobs";
import { useRef } from "react";

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;
  const submit = useSubmit();
  const timeoutId = useRef(0);

  const handleSearchJobs = e => {
    clearTimeout(timeoutId.current);
    const form = e.currentTarget.form;

    timeoutId.current = setTimeout(() => {
      submit(form);
    }, 800);
  };

  return (
    <Wrapper>
      <Form>
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={handleSearchJobs}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={e => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={e => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            name="sort"
            list={Object.values(JOB_SORT_TYPE)}
            defaultValue={sort}
            onChange={e => submit(e.currentTarget.form)}
          />
          <Link className="btn form-btn delete-btn" to="/dashboard/all-jobs">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
