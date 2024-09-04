
import { Stack, Typography } from "@mui/material";

const TextSection = ({ title, description }) => {
  return (
    <Stack gap={1}>
      <Typography variant="blgsm">{title}</Typography>
      <Typography variant="bsr">{description}</Typography>
    </Stack>
  );
};

export default TextSection;