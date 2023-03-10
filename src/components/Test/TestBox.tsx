import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import TestWords from "./TestWords";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  incrementTimer,
  resetTest,
  setUserText,
  startTest,
} from "../../store/testSlice";
import { Stack, TextField, Typography, Tooltip } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";

const StyledTextField = styled(
  TextField,
  {}
)<{}>(({ theme }) => ({
  input: {
    color: theme.sub.main,
    fontSize: "1.5rem",
  },
  label: {
    color: "white",
  },
  backgroundColor: theme.sub.alt,
}));

function TestBox() {
  const dispatch = useAppDispatch();
  const inputRef = React.useRef<HTMLDivElement>(null);
  const userText = useAppSelector((state) => state.test.userText);
  const isRunning = useAppSelector((state) => state.test.isRunning);
  const currentWordIndex = useAppSelector(
    (state) => state.test.currentWordIndex
  );
  const wordsList = useAppSelector((state) => state.test.wordsList);
  const timerCount = useAppSelector((state) => state.test.timerCount);
  const theme = useTheme();
  const time = useAppSelector((state) => state.test.time);
  const mode2 = useAppSelector((state) => state.test.mode2);

  // increment timer by 1 if isRunning is true
  useEffect(() => {
    let id: NodeJS.Timer;
    if (isRunning) {
      id = setInterval(() => {
        dispatch(incrementTimer(id));
      }, 1000);

      return () => {
        clearInterval(id);
      };
    }
  }, [isRunning, dispatch, mode2]);

  const processInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if test is over, return
    if (
      currentWordIndex === wordsList.length ||
      (mode2 === "time" && timerCount >= time)
    ) {
      return;
    }
    // if test is not running, start it
    if (!isRunning) {
      dispatch(startTest());
    }

    dispatch(setUserText(e.target.value));
  };

  return (
    <Box
      sx={{
        justifySelf: "center",
        margin: "auto 0",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Stack
        sx={{
          opacity:
            document.activeElement === inputRef.current || timerCount >= time
              ? 1
              : 0,
        }}
        direction={"row"}
        justifyContent={"space-between"}
      >
        {mode2 === "time" && (
          <Typography variant="h5" color={theme.main.main}>
            {time - timerCount}
          </Typography>
        )}
        {(mode2 === "words" || mode2 === "quote") && (
          <Typography
            sx={{
              opacity: timerCount > 0 ? 1 : 0,
            }}
            variant="h5"
            color={theme.main.main}
          >
            {`${currentWordIndex}/${wordsList.length}`}
          </Typography>
        )}

        {/* <Typography variant="h5" color={theme.main.main}>
          {accuracy ? `${accuracy}%` : "0%"}
        </Typography> */}
        {/* <Typography variant="h5" color={theme.main.main}>
          {wpm} WPM
        </Typography> */}
      </Stack>

      <TestWords />

      <StyledTextField
        inputRef={inputRef}
        focused={isRunning}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        maxRows={1}
        variant="filled"
        InputLabelProps={{ shrink: false, tabIndex: 0 }}
        sx={{
          width: "50%",
          maxWidth: "300px",
          margin: "auto",
          borderColor: "white",
          marginTop: "1rem",
        }}
        value={userText}
        onChange={processInput}
        disabled={
          (mode2 === "time" && timerCount >= time) ||
          currentWordIndex === wordsList.length
        }
        autoFocus
      />
      <Tooltip
        placement="left"
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: theme.sub.alt,
              color: theme.main.main,
              fontSize: "1rem",
              padding: "4px 1rem",
            },
          },
          arrow: {
            sx: {
              color: theme.sub.alt,
            },
          },
        }}
        arrow
        title="Restart test"
      >
        <IconButton
          tabIndex={0}
          onClick={() => {
            dispatch(resetTest());
            inputRef.current?.focus();
          }}
          sx={{ margin: "12px auto", padding: "8px" }}
        >
          <RefreshIcon htmlColor={theme.sub.main} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default TestBox;
