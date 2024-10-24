import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { CircularProgress, Container } from '@mui/material';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isVerify, isLoading } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  useEffect(() => {
    console.log(isAuthenticated, isVerify, isLoading)
    if (isAuthenticated && !isVerify) {
      navigate('/auth/signup/verification');
    }
    if (!isLoading && !isAuthenticated &&!isVerify) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return children;
}
