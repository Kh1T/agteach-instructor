import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CustomTableMui from "../components/CustomTableMui";
import AddIcon from '@mui/icons-material/Add';

function ProductPage() {
  const [sortBy, setSortBy] = useState();

  // Dumy data
  function createData(...rest) {
    return { ...rest };
  }
  const headers = ["Product Name", "Category", "Quantity", "Price", "Edit"];
  const rows = [
    createData("Pruning Shears", "Planting Tools", 25, "$15", 'edit'),
    createData("Garden Hose", "Watering Equipment", 50, "$30", 'edit'),
    createData("Soil pH Meter", "Soil Testing", 40, "$25", 'edit'),
    createData("Wheelbarrow", "Transport Tools", 15, "$80", 'edit'),
    createData("Garden Gloves", "Safety Gear", 100, "$5", 'edit'),
    createData("Lawn Mower", "Lawn Care", 10, "$200", 'edit'),
    createData("Compost Bin", "Composting", 12, "$60", 'edit'),
    createData("Garden Trowel", "Planting Tools", 75, "$10", 'edit'),
    createData("Plant Fertilizer", "Soil Amendments", 45, "$12", 'edit'),
    createData("Watering Can", "Watering Equipment", 30, "$8", 'edit'),
    createData("Garden Rake", "Garden Tools", 25, "$20", 'edit'),
    createData("Hedge Trimmer", "Garden Tools", 20, "$100", 'edit'),
    createData("Seed Starter Kit", "Planting Tools", 60, "$18", 'edit'),
    createData("Bird Feeder", "Garden Decor", 40, "$25", 'edit'),
    createData("Plant Labels", "Garden Accessories", 150, "$3", 'edit'),
  ];
  const data = { headers, rows };

  return (
    <Box sx={{ width: "100%"}}>      
      <Stack direction="row" sx={{ justifyContent: "space-between" , mb:2}}>
        <Stack direction="row" spacing={2}>
          <TextField
            id="search"
            label="Search"
            variant="outlined"
            placeholder="How to maintain plant"
          />
          <Box sx={{ minWidth: 180 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select">Sort</InputLabel>
              <Select
                id="demo-simple-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Transaction"
                defaultValue="10"
              >
                <MenuItem value={10}>Newest</MenuItem>
                <MenuItem value={20}>Oldest</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="outlined"
            // color="blue"
            sx={{
              textTransform: "uppercase",
              color: "purple.main",
              borderColor: "purple.main",
            }}
          >
            Search
          </Button>
        </Stack>
        <Button
          variant="contained"
          sx={{ backgroundColor: "purple.main", textTransform: "uppercase" }}
        >
          Create Product
          <AddIcon sx={{ml: 1}}/>
        </Button>
      </Stack>
      <CustomTableMui data={data}/>
    </Box>
  );
}

export default ProductPage;
