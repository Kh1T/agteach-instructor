import { Box, Button } from "@mui/material";
/**
 * ButtonComponent renders a button component inside a box with flex layout.
 *
 * @param {string} text - The text for the button.
 * @param {string} variant - The variant of the button.
 * @param {string} bgcolor - The background color of the button.
 * @param {boolean} flexEnd - Whether the button should be aligned at the end of the box.
 * @param {number} height - The height of the button.
 * @param {number} pl - The padding left of the box.
 * @param {ReactNode} startIcon - The start icon of the button.
 * @param {function} onClick - The function to be called when the button is clicked.
 *
 * @returns {ReactElement} A Box component with a Button inside.
 */
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
