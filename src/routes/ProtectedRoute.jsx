import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { CircularProgress, Container } from "@mui/material";

/**
 * This component is used to protect routes from unauthenticated users.
 * It checks if the user is authenticated, verified and approved.
 * If the user is not authenticated, it redirects to the login page.
 * If the user is not verified, it redirects to the verification page.
 * If the user is not approved, it redirects to the root page.
 * If the user is authenticated and approved, it renders the children.
 * If the user is loading, it renders a circular progress.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isVerify, isLoading } = useSelector(
    (state) => state.auth
  );
  const { isApproved, isApprovalLoading } = useSelector(
    (state) => state.approval
  );
  const navigate = useNavigate();

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
