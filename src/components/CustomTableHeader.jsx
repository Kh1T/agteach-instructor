import { Stack, Typography } from "@mui/material";

export default function CustomTableHeader({title, content}){
    return(
        <Stack
          direction="column"
          sx={{
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <Typography>{content}</Typography>
        </Stack>
    )
}