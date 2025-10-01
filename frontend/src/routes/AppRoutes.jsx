import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import AuthRedirect, {
  ProtectedRoute,
  ProtectedRoutedRole,
} from "../lib/AuthRedirect";
import Users from "../pages/Users";
import AddPatient from "../pages/AddPatient";
import PatientDetails from "../pages/PatientDetails";
import DoctorLabReports from "../pages/DoctorLabReports";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <AuthRedirect>
            <SignUpPage />
          </AuthRedirect>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <AuthRedirect>
            <LoginPage />
          </AuthRedirect>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutedRole role="admin">
            <Users />
          </ProtectedRoutedRole>
        ),
      },
    ],
  },
  {
    path: "/add-patient",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutedRole role="reception">
            <AddPatient />
          </ProtectedRoutedRole>
        ),
      },
    ],
  },
  {
    path: "/doctor/patient/:id",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoutedRole role="doctor">
            <PatientDetails />
          </ProtectedRoutedRole>
        ),
      },
    ],
  },
  {
    path: "/doctor/reports",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutedRole role="doctor">
            <DoctorLabReports />
          </ProtectedRoutedRole>
        ),
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
