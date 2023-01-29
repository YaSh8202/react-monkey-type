import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import MemoMtLogo from "./MtLogo";
import KeyboardRoundedIcon from "@mui/icons-material/KeyboardRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { resetTest } from "../store/testSlice";
import { UserContext } from "../store/userContext";
import { signOut } from "firebase/auth";
import { auth } from "../util/firebase";
function Navbar() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, username, loading } = React.useContext(UserContext);
  console.log(user, username, loading);
  return (
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
        <Box
          onClick={() => navigate("/")}
          display={"flex"}
          alignItems={"center"}
          gap={1}
          sx={{
            cursor: "pointer",
          }}
        >
          <MemoMtLogo height={"24px"} width="40px" fill={theme.caret.main} />
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
            position={"relative"}
          >
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
            <Typography color={theme.text.main} variant="h4">
              monkeytype
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={() => {
            navigate("/");
            dispatch(resetTest());
          }}
        >
          <KeyboardRoundedIcon fontSize="small" htmlColor={theme.sub.main} />
        </IconButton>
        {/* <IconButton>
          <MemoCrown height={20} width={20} color={theme.menuBtn["2"]} />
        </IconButton>
        <IconButton>
          <SettingsIcon fontSize="small" htmlColor={theme.menuBtn["3"]} />
        </IconButton> */}
      </Box>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Box
          sx={{
            color: theme.sub.main,
            transition: "color 0.2s",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
              color: theme.text.main,
            },
          }}
        >
          {username && (
            <>
              <PersonRoundedIcon fontSize="small" />
              <Typography
                sx={{
                  marginLeft: 1 / 2,
                }}
                variant="body2"
              >
                {username}
              </Typography>
            </>
          )}
        </Box>

        <Box
          onClick={() => {
            if (username) {
              signOut(auth);
            }
            navigate("/login");
          }}
          sx={{
            color: theme.sub.main,
            transition: "color 0.2s",
            cursor: "pointer",
            "&:hover": {
              color: theme.text.main,
            },
          }}
        >
          {username ? (
            <LogoutIcon fontSize="small" />
          ) : (
            <PersonOutlineOutlinedIcon fontSize="small" />
          )}
        </Box>
      </Stack>
    </Stack>
  );
}

export default Navbar;
// function Crown(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       aria-hidden="true"
//       width="1em"
//       height="1em"
//       viewBox="0 0 24 24"
//       className="prefix__iconify prefix__iconify--mdi"
//       {...props}
//     >
//       <path
//         fill="currentColor"
//         d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5m14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"
//       />
//     </svg>
//   );
// }

// const MemoCrown = React.memo(Crown);
