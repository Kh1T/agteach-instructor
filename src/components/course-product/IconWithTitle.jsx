import { Box, Stack, Typography } from "@mui/material";
import { iconContainerStyle } from "../../theme/courseProductStyles";
/**
 * IconWithTitle component renders an icon and a title.
 *
 * @param {{title: string, icon: JSX.Element, highlight: string}} props
 *   - title: title of the component
 *   - icon: icon of the component
 *   - highlight: additional text to be displayed with the title
 * @returns {JSX.Element} a JSX element containing the icon and title
 */
export default function IconWithTitle({ title, icon, highlight }) {
  return (
    <Stack direction="row" gap={1} alignItems="center" marginY={4}>
      <Box sx={iconContainerStyle}>{icon}</Box>
      <Typography variant={"h3"}>
        {title}{" "}
        <Typography variant="'h3" color="gray">
          {highlight ? `(${highlight})` : ""}
        </Typography>
      </Typography>
    </Stack>
  );
}
