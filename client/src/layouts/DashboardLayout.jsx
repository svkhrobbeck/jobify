import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { createContext, useContext, useState } from "react";
import customAxios from "../utils/customAxios";
import { toast } from "react-toastify";
import checkToastThemeOption from "../utils/checkToastThemeOption";

export const dashboardLoader = async () => {
  try {
    const { data } = await customAxios.get("/users/current-user");
    return data;
  } catch (err) {
    return redirect("/");
  }
};

const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);
  const { user } = useLoaderData();

  const toggleTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(prev => !prev);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("dark-theme", newDarkTheme);
  };

  const toggleSidebar = () => setSidebar(prev => !prev);

  const logoutUser = async () => {
    await customAxios.get("/auth/logout");
    navigate("/");
    toast.success("Logging out...", checkToastThemeOption());
  };

  return (
    <DashboardContext.Provider value={{ user, sidebar, isDarkTheme, toggleSidebar, toggleTheme, logoutUser }}>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
