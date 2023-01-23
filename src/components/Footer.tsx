import { Box, Button, Link, useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
function Footer() {
  const theme = useTheme();
  return (
    <Box
      height={80}
      width={"100%"}
      // bgcolor={theme.sub.main}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-end"}
    >
      <Stack
        height={"20px"}
        width={"100%"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"}>
          <Link
            // open in new tab
            target="_blank"
            href="https://github.com/YaSh8202/react-monkey-type"
            sx={{
              background: "transparent",
              border: "none",
              color: theme.sub.main,
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "13px",
              "&:hover": {
                color: theme.text.main,
                transition: "all 0.2s ease-in-out",
              },
            }}
          >
            <GitHubIcon sx={{ padding: "1.5px" }} fontSize="small" />
            GitHub
          </Link>
        </Stack>
        <Stack direction={"row"}>
          <Box
            sx={{
              background: "transparent",
              color: theme.sub.main,
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer",
              "&:hover": {
                color: theme.text.main,
                transition: "all 0.2s ease-in-out",
              },
            }}
          >
            <PaletteRoundedIcon sx={{ padding: "1.5px" }} fontSize="small" />
            Change Theme
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;
