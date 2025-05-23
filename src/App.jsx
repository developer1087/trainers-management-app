import { useState } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./CSS/reset.css";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import EditTrainerProfile from "./components/EditTrainerProfile/EditTrainerProfile";
import TraineesPage from "./pages/TraineesPage/TraineesPage";
import SingleTraineePage from "./pages/SingleTraineePage/SingleTraineePage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import Navbar from "./components/Navbar/Navbar";
import SingleSessionPage from "./pages/SingleSessionPage/SingleSessionPage";
import PaymentPage  from "./pages/PaymentPage/PaymentPage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import EmailVerificationHandler from "./components/EmailVerificationHandler/EmailVerificationHandler";


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
    path: "verify-email",
    element: <EmailVerificationHandler />,
  },
  {
    path: "reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      {
        path: "dashboardPage",
        element: <DashboardPage />,
      },
      {
        path: "traineesPage",
        element: <TraineesPage />,
      },
      {
        path: "calendarPage",
        element: <CalendarPage />,
      },
      {
        path: "singleTraineePage",
        element: <SingleTraineePage />,
      },
      {
        path: "sessionsPage",
        element: <SessionsPage />,
      },
      {
        path: "singleSessionPage",
        element: <SingleSessionPage />,
      },
      {
        path: "paymentsPage",
        element: <PaymentPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />, 
      },
      {
        path: "edit-profile",
        element: <EditTrainerProfile/>,
      }
    ],
  },
]);

function NavbarWrapper() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
function App() {
  return <RouterProvider router={router} />;
}

export default App;
