import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./CSS/reset.css";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
