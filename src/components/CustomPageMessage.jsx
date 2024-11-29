import { Box, Stack, Typography } from '@mui/material';

/**
 * Renders a page with a custom message, image, title and subtitle.
 *
 * @param {{ title: string, subtitle: string, image: string }} props
 *   - title: title of the page
 *   - subtitle: subtitle of the page
 *   - image: link to the image to display
 *
 * @returns {JSX.Element} The JSX element representing the page with the custom message.
 */
export const CustomPageMessage = ({ title, subtitle, image }) => {
  return (
    <Stack
      sx={{ backgroundColor: 'grey.100', pb: 5 }}
      alignItems="center"
      justifyContent="center"
    >
      <Box component="img" src={image} width={250} />
      <Stack spacing={2} sx={{ textAlign: 'center', width: '360px' }}>
        <Typography variant="h4" color="primary">
          {title}
        </Typography>
        <Typography variant="bsr" color="dark.200">
          {subtitle}
        </Typography>
      </Stack>
    </Stack>
  );
};
