import { ThemeProvider } from "@emotion/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { router } from "./route/index";
import theme from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
