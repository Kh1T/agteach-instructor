import { Alert, AlertTitle, Stack } from '@mui/material';
import { CustomPageMessage } from '../CustomPageMessage';
import NotApproveImage from '../../assets/dashboard-not-approve.svg';

/**
 * Renders a page that displays a success message to the user when their application has been submitted.
 *
 * The page displays a green success alert with a title and a short message, followed
 * by a {@link CustomPageMessage} component that displays a background image,
 * title, and subtitle. The background image displays an image of a person
 * standing in front of a blue ' ' symbol. The title and subtitle are displayed
 * in a white box on top of the background image.
 *
 * @returns {React.ReactElement} A JSX element representing the application submitted page.
 */
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
