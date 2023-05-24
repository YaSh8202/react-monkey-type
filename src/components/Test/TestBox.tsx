import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import TestWords from "./TestWords";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  calculateWMP,
  incrementTimer,
  resetTest,
  setUserText,
  startTest,
} from "../../store/testSlice";
import { Stack, Typography, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";

function TestBox() {
  const dispatch = useAppDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isRunning = useAppSelector((state) => state.test.isRunning);
  const currentWordIndex = useAppSelector(
    (state) => state.test.currentWordIndex
  );
  const wordsList = useAppSelector((state) => state.test.wordsList);
  const timerCount = useAppSelector((state) => state.test.timerCount);
  const theme = useTheme();
  const time = useAppSelector((state) => state.test.time);
  const mode2 = useAppSelector((state) => state.test.mode2);
  const [isInputFocused, setIsInputFocused] = useState(true);

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

  const processInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // if test is over, return
    if (
      currentWordIndex === wordsList.length ||
      (mode2 === "time" && timerCount >= time)
    ) {
      return;
    }
    const isCharacter = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/ ?]$/.test(
      e.key
    );
    // if test is not running, start it
    if (isCharacter && !isRunning) {
      dispatch(startTest());
    }
    if (isCharacter || e.key === "Backspace") {
      dispatch(setUserText(e.key));
      dispatch(calculateWMP());
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
    setIsInputFocused(true);
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

      <TestWords
        onClick={() => {
          focusInput();
        }}
        showFocusInside={!isInputFocused}
      />

      <input
        ref={inputRef}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        style={{
          width: "5%",
          opacity: 0,
        }}
        // onChange={processInput}
        onKeyDown={processInput}
        disabled={
          (mode2 === "time" && timerCount >= time) ||
          currentWordIndex === wordsList.length
        }
        autoFocus
        onBlur={() => setIsInputFocused(false)}
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
            focusInput();
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
