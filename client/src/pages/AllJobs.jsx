import { useLoaderData } from "react-router-dom";
import { JobsContainer, SearchContainer } from "../components";
import { useContext, createContext } from "react";
import checkToastThemeOption from "../utils/checkToastThemeOption";
import customAxios from "../utils/customAxios";
import { toast } from "react-toastify";

const AllJobsContext = createContext();

export const allJobsLoader = async () => {
  try {
    const { data } = await customAxios.get("/jobs");
    return { data };
  } catch (err) {
    toast.error(err?.response?.data?.msg, checkToastThemeOption());
    return err;
  }
};

const AllJobs = () => {
  const { data } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;
