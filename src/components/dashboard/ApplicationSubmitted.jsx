import { Alert, AlertTitle, Stack } from '@mui/material';
import { CustomPageMessage } from '../CustomPageMessage';
import NotApproveImage from '../../assets/dashboard-not-approve.svg';

export const ApplicationSubmitted = () => {
  return (
    <Stack gap={3}>
      <Alert severity="success">
        <AlertTitle>Application Submitted</AlertTitle>
        Your application has been submitted successfully, hang on tight while we
        review your application.
      </Alert>
      <CustomPageMessage
      image={NotApproveImage}
        title="Your account is being reviewed by AgTeach Admin"
        subtitle="Please be patient. We will send you an email when this process is
          finished.  More Information: khomkhit460@gmail.com"
      />
    </Stack>
  );
};
