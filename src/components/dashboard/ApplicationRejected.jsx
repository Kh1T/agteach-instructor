import { Alert, AlertTitle, Stack } from '@mui/material';
import { CustomPageMessage } from '../CustomPageMessage';

export const ApplicationRejected = () => {
  return (
    <Stack>
      <Alert severity="error">
        <AlertTitle>Application Rejected</AlertTitle>
        Your application has been rejected, please check your email for more
        information.
      </Alert>
      <CustomPageMessage
        title="Your application has been rejected"
        subtitle="Please check your email for more information"
      />
    </Stack>
  );
};
