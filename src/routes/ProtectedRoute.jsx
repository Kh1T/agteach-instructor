import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { CircularProgress, Container } from "@mui/material";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isVerify, isLoading } = useSelector(
    (state) => state.auth
  );
  const { isApproved, isApprovalLoading } = useSelector(
    (state) => state.approval
  );
  const navigate = useNavigate();

  console.log("Protected route", isApproved, isApprovalLoading);

  const location = useLocation();
  useEffect(() => {
    if (isAuthenticated && !isVerify) {
      navigate("/auth/signup/verification");
    }
    if (!isLoading && !isAuthenticated && !isVerify) {
      navigate("/auth/login");
    }
    if (location.pathname === "/setting" && !isApprovalLoading) {
      return () => children;
    }
    if (!isApproved && location.pathname !== "/" && !isApprovalLoading) {
      navigate("/");
    }
  }, [
    isAuthenticated,
    isLoading,
    isVerify,
    isApproved,
    location,
    isApprovalLoading,
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
