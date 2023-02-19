import { Box, Link, useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import GitHubIcon from "@mui/icons-material/GitHub";
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
import { useAppDispatch, useAppSelector } from "../store/store";
import { openModal } from "../store/themeSlice";
import ThemeModal from "./ThemeModal";
function Footer() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.theme.theme);
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
            onClick={() => {
              dispatch(openModal());
            }}
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
            {currentTheme}
          </Box>
        </Stack>
      </Stack>
      <ThemeModal />
    </Box>
  );
}

export default Footer;
