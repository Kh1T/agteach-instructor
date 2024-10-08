
import { Stack, Typography } from "@mui/material";

/**
 * A component to display a title and description in a single section.
 *
 * Renders a title with variant "blgsm" and a description with variant "bsr",
 * with a gap of 1.5rem between them and a margin of 3rem above and below the
 * section.
 *
 * @param {string} title The title of the section
 * @param {string} description The description of the section
 * @returns {JSX.Element} The TextSection component
 */
const TextSection = ({ title, description }) => {
  return (
    <Stack gap={1.5} marginY={3}>
      <Typography variant="blgsm">{title}</Typography>
      <Typography variant="bsr">{description}</Typography>
    </Stack>
  );
};

export default TextSection;