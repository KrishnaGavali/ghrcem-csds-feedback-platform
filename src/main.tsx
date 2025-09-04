import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import Auth from "./pages/auth/page";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./context/Auth";
import Dashboard from "./pages/faculty/dashboard/page";
import FormSubmit from "./pages/student/submit/page";
import { FormProvider } from "./context/Form";
import { SubmissionProvider } from "./context/Submission";
import ToasterComponent from "./components/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth" replace />,
  },
  {
    path: "/auth",
    element: (
      <AuthProvider>
        <Auth />
      </AuthProvider>
    ),
  },
  {
    path: "/faculty/dashboard",
    element: (
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    ),
  },
  {
    path: "/student/forms/submit",
    element: (
      <FormProvider>
        <SubmissionProvider>
          <FormSubmit />
        </SubmissionProvider>
      </FormProvider>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
      <ToasterComponent />
    </ThemeProvider>
  </StrictMode>
);
