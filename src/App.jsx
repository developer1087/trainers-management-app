import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./CSS/reset.css";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import TraineesPage from "./pages/TraineesPage/TraineesPage";
import SingleTraineePage from "./pages/SingleTraineePage/SingleTraineePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "authPage",
    element: <AuthPage />,
  },
  {
    path: "dashboardPage",
    element: <DashboardPage />,
  },
  {
    path: "traineesPage",
    element: <TraineesPage />,
  },
  {
    path: "singleTraineePage",
    element: <SingleTraineePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
