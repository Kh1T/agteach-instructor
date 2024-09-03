import { Button, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CustomSelect from "./CustomSelect";

/**
 * QueryHeader component
 * @param {function} useSelectState - state to store selected value ex: [state, setState]
 * @param {array} selectData - array of select data
 * @param {function} handleCreateNew - handle create new
 * @param {function} handleSearch - handle search
 * @param {string} placeholder - placeholder text for TextField
 * @returns {ReactElement} QueryHeader component
 */
export default function QueryHeader({
  useSelectState,
  selectData,
  handleCreateNew,
  handleSearch,
  placeholder = "Search",
}) {
  // const selectComponent =
  const content = (
    <Stack direction="row" sx={{ justifyContent: "space-between", mb: 2 }}>
      <Stack direction="row" spacing={2}>
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          placeholder={placeholder}
          sx={{ width: 300 }}
        />
        <CustomSelect
          label="Sort"
          useSelectState={useSelectState}
          selectData={selectData}
        />
        <Button
          variant="outlined"
          sx={{
            textTransform: "uppercase",
            color: "purple.main",
            borderColor: "purple.main",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Stack>
      <Button
        variant="contained"
        sx={{ backgroundColor: "purple.main", textTransform: "uppercase" }}
        handleCreateNew={handleCreateNew}
      >
        Create Product
        <AddIcon sx={{ ml: 1 }} />
      </Button>
    </Stack>
  );
  return content;
}
