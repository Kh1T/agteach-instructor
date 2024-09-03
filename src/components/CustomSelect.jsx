import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


/**
 * CustomSelect component
 * @param {object} props
 * @param {function} props.useSelectState - state to store selected value ex: [state, setState]
 * @param {array} props.selectData - array of select data
 * @returns {ReactElement}
 */
export default function CustomSelect({ label, useSelectState, selectData }) {
  const [selectState, setSelectState] = useSelectState;

  return (
    <FormControl >
      <InputLabel id="demo-simple-select">{label}</InputLabel>
      <Select
        id="demo-simple-select"
        value={selectState}
        onChange={(e) => setSelectState(e.target.value)}
        label="Transaction"
        defaultValue="10"
      >
        {selectData.map((item, id) => (
          <MenuItem value={id * 10} key={id}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
