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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: "/course",
        children: [
          { index: true, element: <CoursePage /> },
          { path: "new", element: <NewCoursePage /> },
          { path: ":courseId/edit", element: <EditCoursePage /> },
        ],
      },
      {
        path: "/product",
        children: [
          { index: true, element: <ProductPage /> },
          { path: "new", element: <NewProductPage /> },
          { path: ":productId/edit", element: <EditProductPage /> },
        ],
      },

      { path: "/purchased", element: <PurchasedPage /> },
      { path: "/enrollment", element: <EnromentPage /> },
      { path: "/balance", element: <BalancePage /> },
      { path: "/setting", element: <SettingPage /> },
    ],
  },

  { path: "/login", element: <LoginPage /> },
]);
