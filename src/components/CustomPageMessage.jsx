import { Box, Stack, Typography } from '@mui/material';

export const CustomPageMessage = ({ title, subtitle, image }) => {
  return (
    <Stack component="section" sx={{ backgroundColor: 'grey.100', pb: 5 }}>
      <Stack
        direction="column"
        sx={{
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box component="img" src={image} />
        <Stack spacing={2} sx={{ textAlign: 'center', width: '360px' }}>
          <Typography variant="h4" color="primary">
            {title}
          </Typography>
          <Typography variant="bmdr" color="dark.200">
            {subtitle}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
