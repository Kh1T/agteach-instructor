import { Box, Stack, Typography } from "@mui/material";
import IconNotApprove from '../assets/dashboard-not-approve.svg';

export const CustomPageMessage = ({title, subtitle, }) => {
    return       <Stack component="section" sx={{ backgroundColor: 'grey.100', pb: 5 }}>
    <Stack
      direction="column"
      sx={{
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box component="img" src={IconNotApprove} />
      <Stack spacing={2} sx={{ textAlign: 'center', width: '360px' }}>
        <Typography variant="h4" color="primary">
          {title}
        </Typography>
        <Typography variant="bmdr" color="dark.200">
          {subtitle}
        </Typography>
      </Stack>
    </Stack>
  </Stack>;
};