import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { RouterProvider } from "react-router-dom";

import { router } from "./route/index";
import theme from "./theme/theme";
import { CssBaseline } from "@mui/material";
import { useDispatch } from "react-redux";
import { useIsLoginQuery } from "./store/api/authApi";
import { checkLoginStatus } from "./store/slice/authSlice";

function App() {
  const dispatch = useDispatch()
  const { isSuccess} = useIsLoginQuery()
  dispatch(checkLoginStatus(isSuccess))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
