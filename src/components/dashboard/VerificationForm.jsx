import { Stack } from "@mui/material";
import FormApproval from "./FormApproval";
import { ApplicationInstruction } from "./ApplicationInstruction";

/**
 * VerificationForm renders a component containing a form for the user to verify
 * their eligibility to become an instructor and a component providing detailed
 * instructions for verifying eligibility and submitting an application.
 *
 * The form is presented on the left side of the row, and the instructions are
 * presented on the right side of the row. The spacing between the components is
 * 8 units.
 *
 * @returns {React.ReactElement} A JSX element representing the VerificationForm
 * component with a form for verifying eligibility and detailed instructions
 * for submitting an application.
 */
export default function VerificationForm() {
  return (
      <Stack direction={"row"} spacing={8} mb={10}>
        <FormApproval />
        <ApplicationInstruction />
      </Stack>
  );
}
