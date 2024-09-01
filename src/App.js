import { ThemeProvider } from "@emotion/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import theme from "./theme/theme";
import RootLayout from "./pages/Root";
import DashboardPage from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import CoursePage from "./pages/Course";
import ProductPage from "./pages/Product";
import PurchasedPage from "./pages/Purchased";
import EnromentPage from "./pages/Enrollment";
import BalancePage from "./pages/Balance";
import SettingPage from "./pages/Setting";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/course", element: <CoursePage /> },
        { path: "/product", element: <ProductPage /> },
        { path: "/purchased", element: <PurchasedPage /> },
        { path: "/enrollment", element: <EnromentPage /> },
        { path: "/balance", element: <BalancePage /> },
        { path: "/setting", element: <SettingPage /> },
      ],
    },
  ]);
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
