import { Box, Button, Stack, TextField, Typography } from "@mui/material";

function ProductPage() {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack>
        <Stack>
          
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Stack>
      <Button
        variant="contained"
        sx={{ backgroundColor: "purple.main", textTransform: "uppercase" }}
      >
        Create Product
      </Button>
      </Stack>
      
    </Box>
  );
}

export default ProductPage;
