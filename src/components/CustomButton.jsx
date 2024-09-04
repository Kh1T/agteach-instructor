import { Button } from "@mui/material";

function CustomButton({ type = "contained", children }) {
  return (
    <Button
      sx={{
        height: 50,
        borderRadius: 2,
        width: "100%",
      }}
      type="submit"
      variant={type}
      color="primary"
    >
      {children}
    </Button>
  );
}

export default CustomButton;
