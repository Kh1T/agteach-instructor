import { Stack, Typography } from "@mui/material";

export default function FormTextSection({ title, description }) {
  return (
    <Stack spacing={1.5}>
      <Typography variant="blgsm" color="grey.700">
        {title}
      </Typography>
      {description && <Typography variant="bsr" color="grey.600">
        {description}
      </Typography>}
    </Stack>
  );
}
