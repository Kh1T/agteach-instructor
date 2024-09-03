import { Button, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CustomSelect from "./CustomSelect";

/**
 * QueryHeader component
 * @description A component that displays a search bar and create new button
 * @param {object} props
 * @param {React.RefObject<HTMLInputElement>} [props.searchRef=null] - Reference to the search text input
 * @param {function} props.useSelectState - state to store selected value ex: [state, setState]
 * @param {array} props.selectData - array of select data
 * @param {function} props.handleCreateNew - function to handle create new button
 * @param {function} props.handleSearch - function to handle search button
 * @param {string} [props.labelCreate="Create New"] - label for create new button
 * @param {string} [props.placeholder="Search"] - placeholder for search input
 * @returns {ReactElement} QueryHeader component
 */
export default function QueryHeader({
  searchRef = null,
  useSelectState,
  selectData,
  handleCreateNew,
  handleSearch,
  labelCreate = "Create New",
  placeholder = "Search",
  isCreateNew = true,
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
          inputRef={searchRef}
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
      {isCreateNew && (
        <Button
          variant="contained"
          sx={{ backgroundColor: "purple.main", textTransform: "uppercase" }}
          handleCreateNew={handleCreateNew}
        >
          {labelCreate}
          <AddIcon sx={{ ml: 1 }} />
        </Button>
      )}
    </Stack>
  );
  return content;
}
