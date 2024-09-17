import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../pages/Root";
import DashboardPage from "../pages/Dashboard";
import LoginPage from "../pages/Login";
import CoursePage from "../pages/Course";
import ProductPage from "../pages/Product";
import PurchasedPage from "../pages/Purchased";
import EnromentPage from "../pages/Enrollment";
import BalancePage from "../pages/Balance";
import SettingPage from "../pages/Setting";
import NewProductPage from "../pages/NewProduct";
import EditProductPage from "../pages/EditProduct";
import NewCoursePage from "../pages/NewCourse";
import EditCoursePage from "../pages/EditCourse";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import AdditionalInformation from "../pages/AdditionalInformation";
import ResetPassword from "../pages/ResetPassword";
import EnrollmentDetailPage from "../pages/EnrollmentDetail";
import PurchasedDetailPage from "../pages/PurchasedDetail";
import ErrorPage from "../pages/Error";
import AuthRootLayout from "./AuthRoot";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "course", element: <CoursePage /> },
      { path: "course/new", element: <NewCoursePage /> },
      { path: "course/:courseId/edit", element: <EditCoursePage /> },
      { path: "product", element: <ProductPage /> },
      { path: "product/new", element: <NewProductPage /> },
      { path: "product/:productId/edit", element: <EditProductPage /> },
      { path: "purchased", element: <PurchasedPage /> },
      { path: "purchased/:purchaseId", element: <PurchasedDetailPage /> },
      { path: "enrollment", element: <EnromentPage /> },
      { path: "enrollment/:enrollmentId", element: <EnrollmentDetailPage /> },
      { path: "balance", element: <BalancePage /> },
      { path: "setting", element: <SettingPage /> },
    ],
  },

  { path: "*", element: <ErrorPage /> },

  {
    path: "/auth",
    Element: <AuthRootLayout />,
    children: [
      { index: true, path: "login", element: <LoginPage /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "signup", element: <Signup /> },
      { path: "signup/additional", element: <AdditionalInformation /> },
      { path: "reset-password/:resetToken", element: <ResetPassword /> },
    ],
  },
]);
