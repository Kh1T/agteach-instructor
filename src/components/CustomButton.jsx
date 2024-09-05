import { Button } from "@mui/material";

function CustomButton({ children, ...props }) {
  return (
    <Button
      sx={{
        height: 50,
        borderRadius: 2,
        width: "100%",
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
