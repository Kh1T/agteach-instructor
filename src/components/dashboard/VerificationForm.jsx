import { Stack } from "@mui/material";
import FormApproval from "./FormApproval";
import { ApplicationInstruction } from "./ApplicationInstruction";

export default function VerificationForm() {
  return (
      <Stack direction={"row"} spacing={8} mb={10}>
        <FormApproval />
        <ApplicationInstruction />
      </Stack>
  );
}
