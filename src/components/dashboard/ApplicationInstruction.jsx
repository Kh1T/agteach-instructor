import React from "react";
import { Box, Typography, Divider, List, ListItem, ListItemText } from "@mui/material";

export const ApplicationInstruction = () => {
  return (
    <Box sx={{ p: 3, backgroundColor: "#1a1a1a", color: "#ffffff", borderRadius: "8px" }}>
      {/* Title */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Last Step: Verify Eligibility
      </Typography>

      <Divider sx={{ borderColor: "#444", mb: 2 }} />

      {/* Intro */}
      <Typography variant="body1" sx={{ mb: 2 }}>
        To ensure your content aligns with our standards, we require you to answer a few
        questions for verification. Please read the instructions carefully before
        submitting, as you can only submit your application once.
      </Typography>

      <Divider sx={{ borderColor: "#444", mb: 2 }} />

      {/* Section 1: How to Verify */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
        How to Verify Your Eligibility?
      </Typography>
      <List sx={{ mb: 2, pl: 2 }}>
        <ListItem disableGutters>
          <ListItemText primary="Complete the required additional information." />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="Submit your details for review by the AgTeach admin team." />
        </ListItem>
      </List>

      <Divider sx={{ borderColor: "#444", mb: 2 }} />

      {/* Section 2: What Happens After */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
        What Happens After Submitting Your Application?
      </Typography>
      <List sx={{ mb: 2, pl: 2 }}>
        <ListItem disableGutters>
          <ListItemText primary="Your application will be reviewed by the AgTeach admin team." />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="This process typically takes 24 hours but may extend to several days." />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="You will receive an email either approved or rejected." />
        </ListItem>
      </List>

      <Divider sx={{ borderColor: "#444", mb: 2 }} />

      {/* Section 3: Features */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
        Once approved, you will gain access to features such as:
      </Typography>
      <List sx={{ pl: 2 }}>
        <ListItem disableGutters>
          <ListItemText primary="Creating and managing courses." />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="Creating and listing products." />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="Allowing customers to purchase your products." />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="Enabling customers to enroll in your courses." />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="Tracking your daily sales and more." />
        </ListItem>
      </List>
    </Box>
  );
};
