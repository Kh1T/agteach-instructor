import { Alert, AlertTitle, Stack } from '@mui/material';
import { CustomPageMessage } from '../CustomPageMessage';
import rejectedImage from '../../assets/dashboard-rejected-bg.svg';

/**
 * Renders a page that displays an error message to the user when their application has been rejected.
 *
 * The page displays a red error alert with a title and a short message, followed
 * by a {@link CustomPageMessage} component that displays a background image,
 * title, and subtitle. The background image displays an image of a person
 * standing in front of a red 'X' symbol. The title and subtitle are displayed
 * in a white box on top of the background image.
 *
 * @returns {React.ReactElement} A JSX element representing the application rejected page.
 */
export const ApplicationRejected = () => {
  return (
    <Stack gap={3}>
      <Alert severity="error">
        <AlertTitle>Application Rejected</AlertTitle>
        Your application has been rejected, please check your email for more
        information.
      </Alert>
      <CustomPageMessage
        image={rejectedImage}
        title="Your application has been rejected by AgTeach Admin"
        subtitle="Thank you for your interest in AgTeach. Unfortunately, your application has been rejected. Please check your email for more information."
      />
    </Stack>
  );
};
