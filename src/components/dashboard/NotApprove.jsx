import { Alert, AlertTitle, Box, Stack, Typography } from '@mui/material';
import { CustomPageMessage } from '../CustomPageMessage';

/**
 * NotApprove component renders a section with a centered stack, containing
 * an alert icon, a heading, and three paragraphs of text.
 *
 * @returns {JSX.Element} A JSX element representing the NotApprove component.
 */
function NotApprove() {
  return (
    <Stack gap={3} width="100%">
      <Alert severity="success">
        <AlertTitle>Application Submitted</AlertTitle>
        Your application has been submitted successfully, hang on tight while we
        review your application.
      </Alert>
      <Alert severity="error">
        <AlertTitle>Application Rejected</AlertTitle>
        Your application has been rejected, please check your email for more
        information.
      </Alert>
      <CustomPageMessage
        title="Your account is being reviewed by AgTeach Admin"
        subtitle="Please be patient. We will send you an email when this process is
          finished.  More Information: khomkhit460@gmail.com"
      />
    </Stack>
  );
}
export default NotApprove;
