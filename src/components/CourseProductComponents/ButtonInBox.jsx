import { Box, Button } from "@mui/material";
export default function ButtonComponent({ text, variant, bgcolor, flexEnd, height, pl, startIcon, onClick  }) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        paddingY: 2,
        pl: pl,
      }}
      {...(flexEnd ? { justifyContent: "flex-end" } : null)}
    >
      <Button
        variant={variant}
        sx={{ bgcolor: bgcolor, height: height }}
        startIcon={startIcon}
        onClick={onClick}
      >
        {text}
      </Button>
    </Box>
  );
}
