import { Stack, Typography } from "@mui/material";

export default function CustomTableHeader({title, content}){
    return(
        <Stack
          direction="column"
          sx={{
            alignItems: "flex-start"
          }}
        >
          <Typography variant="bmdsm" sx={{color: "dark.400"}}>{title}</Typography>
          <Typography variant="bsr" sx={{color: "dark.400"}}>{content}</Typography>
        </Stack>
    )
}