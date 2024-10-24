import { ThemeProvider } from "@emotion/react";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes/index";
import theme from "./theme/theme";
import { CssBaseline } from "@mui/material";
import { useDispatch } from "react-redux";
import { useIsLoginQuery } from "./services/api/authApi";
import { checkLoginStatus, getInstructorId } from "./features/user/authSlice";
import { useEffect } from "react";
import { setEmail } from "./features/user/userSlice";

function App() {
  const dispatch = useDispatch();
  const { data, isLoading } = useIsLoginQuery();
  console.log("islogin", data);

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(checkLoginStatus(data));
      dispatch(getInstructorId(data.instructorId));
      dispatch(setEmail(data?.email));
    }
  }, [data, isLoading, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
