import React from "react";
import { Typography, Divider, List, ListItem, Stack } from "@mui/material";

/**
 * ApplicationInstruction component provides detailed instructions for verifying
 * eligibility and submitting an application. It includes sections on the steps
 * to verify eligibility, what follows after submission, and features accessible
 * upon approval. Each section is presented with a heading and a list of steps
 * or features.
 *
 * @returns {JSX.Element} A JSX element representing the ApplicationInstruction
 * component with instructions for the user.
 */
export const ApplicationInstruction = () => {
  return (
    <Stack p={3} gap={2} color="dark.300" width={"35%"}>
      {/* Title */}
      <Typography variant="blgsm">Last Step: Verify Eligibility</Typography>
      <DashedDivider />
      {/* Intro */}
      <Typography sx={{ mb: 2 }}>
        To ensure your content aligns with our standards, we require you to
        answer a few questions for verification. Please read the instructions
        carefully before submitting, as you can only submit your application
        once.
      </Typography>
      <DashedDivider />
      {/* Section 1: How to Verify */}
      <SimpleList
        data={eligibilitySteps}
        heading="How to Verify Your Eligibility?"
      />
      <DashedDivider />
      {/* Section 2: What Happens After */}
      <SimpleList
        data={applicationSteps}
        heading="What Happens After Submitting Your Application?"
      />
      <DashedDivider />
      {/* Section 3: Features */}
      <SimpleList
        data={features}
        heading="Once approved, you will gain access to features such as:"
      />
    </Stack>
  );
};

/**
 * SimpleList component renders a heading and a list of items.
 *
 * @param {{heading: string, data: string[]}} props
 *   - heading: heading of the list
 *   - data: array of strings to be rendered as list items
 * @returns {JSX.Element} A JSX element representing the SimpleList component
 */
const SimpleList = ({ heading, data }) => {
  return (
    <Stack>
      <Typography variant="bmdsm">{heading}</Typography>
      <List sx={{ listStyleType: "disc", listStylePosition: "inside" }}>
        {data.map((item, index) => (
          <ListItem key={index} sx={{ display: "list-item" }}>
            {item}
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

/**
 * DashedDivider component renders a dashed divider.
 *
 * It renders a horizontal divider with a dashed border and a gray color.
 *
 * @returns {JSX.Element} A JSX element representing the DashedDivider component
 */
const DashedDivider = () => {
  return (
    <Divider
      sx={{
        border: "1px dashed",
        borderColor: "grey.400",
        width: "100%",
      }}
    />
  );
};

const eligibilitySteps = [
  "Complete the required additional information.",
  "Submit your details for review by the AgTeach admin team.",
];

const applicationSteps = [
  "Your application will be reviewed by the AgTeach admin team.",
  "This process typically takes 24 hours but may extend to several days.",
  "You will receive an email either approved or rejected.",
];

const features = [
  "Creating and managing courses.",
  "Creating and listing products.",
  "Allowing customers to purchase your products.",
  "Enabling customers to enroll in your courses.",
  "Tracking your daily sales and more.",
];
