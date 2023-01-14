import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";
import MemoMtLogo from "./MtLogo";
import KeyboardRoundedIcon from "@mui/icons-material/KeyboardRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Grid from "@mui/material/Grid";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Navbar() {
  const theme = useTheme();
  return (
    <Box display={"flex"} flexDirection={"column"} gap={"24px"}>
      <Stack
        padding={" 5px 0"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          padding={0}
          display={"flex"}
          flexDirection={"row"}
          gap={1}
          color={"white"}
          alignItems={"center"}
        >
          <MemoMtLogo height={"24px"} width="40px" fill={theme.caret.main} />
          <Box position={"relative"}>
            <Typography
              fontSize={10}
              variant="caption"
              position={"absolute"}
              left={0}
              top={-5}
              color={theme.sub.main}
            >
              monkeysee
            </Typography>
            <Typography variant="h4">monkeytype</Typography>
          </Box>
          <IconButton>
            <KeyboardRoundedIcon fontSize="small" htmlColor={theme.sub.main} />
          </IconButton>
          <IconButton>
            <MemoCrown height={20} width={20} color={theme.sub.main} />
          </IconButton>
          <IconButton>
            <SettingsIcon fontSize="small" htmlColor={theme.sub.main} />
          </IconButton>
        </Box>
        <Stack direction={"row"} spacing={1}>
          <Box>
            <IconButton>
              <PersonRoundedIcon fontSize="small" htmlColor={theme.sub.main} />
              <Typography variant="caption" color={theme.sub.main}>
                yash82
              </Typography>
            </IconButton>
            <IconButton>
              <NotificationsRoundedIcon
                fontSize="small"
                htmlColor={theme.sub.main}
              />
            </IconButton>
            <IconButton>
              <LogoutIcon fontSize="small" htmlColor={theme.sub.main} />
            </IconButton>
          </Box>
        </Stack>
      </Stack>

      <Stack
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
          backgroundColor: theme.sub.alt,
          margin: "0 auto",
          color: theme.sub.main,
        }}
      >
        <Stack bgcolor={"transparent"} direction={"row"}>
          <Button
            startIcon={
              <AlternateEmailIcon  sx={{ fontSize: 10 }} />
            }
            style={{
              backgroundColor: "transparent",
              color: theme.sub.main,
              outline: "none",
              border: "none",
              fontWeight: "lighter",
              textTransform: "none",
              fontSize: "12px",
              borderRadius: "8px",
            }}
          >
            @&nbsp;punctuation
          </Button>
          <Button
            style={{
              backgroundColor: "transparent",
              color: theme.sub.main,
              outline: "none",
              border: "none",
              fontWeight: "lighter",
              textTransform: "none",
              fontSize: "12px",
              borderRadius: "8px",
            }}
          >
            @&nbsp;punctuation
          </Button>
        </Stack>
        <Stack></Stack>
        <Stack></Stack>
      </Stack>
    </Box>
  );
}

export default Navbar;
function Crown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      className="prefix__iconify prefix__iconify--mdi"
      {...props}
    >
      <path
        fill="currentColor"
        d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5m14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"
      />
    </svg>
  );
}

const MemoCrown = React.memo(Crown);
