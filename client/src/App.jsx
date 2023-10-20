import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AddJob, Admin, AllJobs, EditJob, Error, Landing, Login, Profile, Register, Stats } from "./pages";
import { DashboardLayout, HomeLayout } from "./layouts";
import { registerAction } from "./pages/Register";
import { loginAction } from "./pages/Login";
import { addJobAction } from "./pages/AddJob";
import { dashboardLoader } from "./layouts/DashboardLayout";
import { allJobsLoader } from "./pages/AllJobs";
import { editJobAction, editJobLoader } from "./pages/EditJob";
import { deleteJobAction } from "./pages/DeleteJob";
import { adminLoader } from "./pages/Admin";

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("dark-theme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            action: editJobAction,
            loader: editJobLoader,
          },
          {
            path: "delete-job/:id",
            action: deleteJobAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
