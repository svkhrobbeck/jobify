import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import { Job, PageBtnContainer } from ".";

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, total, pages, currentPage } = data;

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {total} job{total > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map(job => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {pages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
