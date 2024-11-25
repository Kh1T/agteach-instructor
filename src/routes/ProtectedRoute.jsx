import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { CircularProgress, Container } from "@mui/material";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isVerify, isLoading } = useSelector(
    (state) => state.auth
  );
  const { isApproved } = useSelector((state) => state.approval);
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location);
  useEffect(() => {
    if (isAuthenticated && !isVerify) {
      navigate("/auth/signup/verification");
    }
    if (!isLoading && !isAuthenticated && !isVerify) {
      navigate("/auth/login");
    }
    if (location.pathname === "/setting") {
      return () => children;
    }
    if (isAuthenticated && isVerify && !isApproved) {
      navigate("/");
    }
  }, [
    isAuthenticated,
    isLoading,
    isVerify,
    isApproved,
    location,
    children,
    navigate,
  ]);

  if (isLoading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }
  return children;
}
