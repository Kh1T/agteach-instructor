import { Box, Stack, Typography } from "@mui/material";
const iconContainerStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  backgroundColor: "purple.main",
  padding: "4px",
};

export default function IconWithTitle({title, icon, highlight}) {
    console.log(highlight)
  return (
    <Stack direction="row" gap={1} alignItems="center" marginY={4}>
      <Box sx={iconContainerStyle}>{icon}</Box>
      <Typography variant={"h3"}>
        {title}{" "}
        <Typography variant="'h3" color="gray">
          {highlight ? `(${highlight})` : ""}
        </Typography>
      </Typography>
    </Stack>
  );
}
