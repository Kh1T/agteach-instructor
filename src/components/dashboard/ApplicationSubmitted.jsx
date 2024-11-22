import { Alert, AlertTitle, Stack } from '@mui/material';
import { CustomPageMessage } from '../CustomPageMessage';

export const ApplicationSubmitted = () => {
  return (
    <Stack>
      <Alert severity="success">
        <AlertTitle>Application Submitted</AlertTitle>
        Your application has been submitted successfully, hang on tight while we
        review your application.
      </Alert>
      <CustomPageMessage
        title="Your account is being reviewed by AgTeach Admin"
        subtitle="Please be patient. We will send you an email when this process is
          finished.  More Information: khomkhit460@gmail.com"
      />
    </Stack>
  );
};
