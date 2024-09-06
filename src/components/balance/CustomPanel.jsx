import { Box } from "@mui/material";

  /**
   * CustomPanel component renders a tab panel.
   * It takes 3 parameters: children, value and index.
   * The children parameter is the content to be displayed in the panel.
   * The value parameter is the value of the currently selected tab.
   * The index parameter is the index of the current tab.
   *
   * @param {object} props - The component props.
   * @param {*} props.children - The content to be displayed in the panel.
   * @param {number} props.value - The value of the currently selected tab.
   * @param {number} props.index - The index of the current tab.
   * @param {object} [props.other] - Additional props to be passed to the Box component.
   * @returns {ReactElement} A React component representing the CustomPanel component.
   */
export default function CustomPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`tab-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </Box>
    );
  }