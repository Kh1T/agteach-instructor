import { ThemeProvider } from "@emotion/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import theme from "./theme/theme";
import RootLayout from "./pages/Root";
import DashboardPage from "./pages/Dashboard";
import LoginPage from "./pages/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: "/login", element: <LoginPage /> },
      ],
    },
  ]);
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
