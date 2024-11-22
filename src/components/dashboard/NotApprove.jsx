import { Stack } from '@mui/material';
import { ApplicationSubmitted } from './ApplicationSubmitted';
import { ApplicationRejected } from './ApplicationRejected';
import { ApplicationInstruction } from './ApplicationInstruction';

/**
 * NotApprove component renders a section with a centered stack, containing
 * an alert icon, a heading, and three paragraphs of text.
 *
 * @returns {JSX.Element} A JSX element representing the NotApprove component.
 */
function NotApprove() {
  return (
    <Stack gap={3} width="100%">
      <ApplicationRejected />
      <ApplicationSubmitted />
      <ApplicationInstruction />
    </Stack>
  );
}
export default NotApprove;
