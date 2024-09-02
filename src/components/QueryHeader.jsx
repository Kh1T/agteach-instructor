import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function QueryHeader({useSelectState, selectData}){
    const [selectState, setSelectState] = useSelectState
    const selectComponent = (
        <FormControl     fullWidth>
              <InputLabel    id="demo-simple-select">Sort</InputLabel>
              <Select   
                id="demo-simple-select"
                value={selectState}
                onChange={(e) => setSelectState(e.target.value)}
                label="Transaction"
                defaultValue="10"
              >
                
                <MenuItem value={10}>Newest</MenuItem>
                <MenuItem value={20}>Oldest</MenuItem>
              </Select>
            </FormControl>
    )
}