import { useLoaderData } from "react-router-dom";
import { JobsContainer, SearchContainer } from "../components";
import { useContext, createContext } from "react";
import checkToastThemeOption from "../utils/checkToastThemeOption";
import customAxios from "../utils/customAxios";
import { toast } from "react-toastify";

const AllJobsContext = createContext();

export const allJobsLoader = async ({ request: { url } }) => {
  const params = Object.fromEntries([...new URL(url).searchParams.entries()]);

  try {
    const { data } = await customAxios.get("/jobs", { params });
    return { data, searchValues: { ...params } };
  } catch (err) {
    const errors = err?.response?.data?.msg.split(",");
    // errors.forEach(err => toast.error(err, checkToastThemeOption()));
    return err;
  }
};

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;
