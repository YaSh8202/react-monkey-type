import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import TestWords from "./TestWords";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  incrementTimer,
  resetTest,
  setUserText,
  startTest,
} from "../store/testSlice";
import { Stack, TextField, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";

const StyledTextField = styled(
  TextField,
  {}
)<{}>(({ theme }) => ({
  input: {
    color: theme.caret.main,
    fontSize: "1.5rem",
  },
  label: {
    color: "white",
  },
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
  const wpm = useAppSelector((state) => state.test.wpm);
  const theme = useTheme();
  const time = useAppSelector((state) => state.test.time);

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
  }, [isRunning, dispatch]);

  const processInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentWordIndex === wordsList.length || timerCount >= time) {
      return;
    }

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
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography color={"white"}>{timerCount}</Typography>
        <Typography color={"white"}>{wpm} WPM</Typography>
      </Stack>
      <TestWords />
      <IconButton
        onClick={() => {
          dispatch(resetTest());
          inputRef.current?.focus();
        }}
        sx={{ margin: "12px auto" }}
      >
        <RefreshIcon htmlColor={theme.sub.main} />
      </IconButton>
      <StyledTextField
        inputRef={inputRef}
        focused={isRunning}
        maxRows={1}
        variant="filled"
        InputLabelProps={{ shrink: false }}
        sx={{
          width: "50%",
          maxWidth: "300px",
          margin: "auto",
          borderColor: "white",
        }}
        value={userText}
        onChange={processInput}
        disabled={timerCount >= time}
      />
    </Box>
  );
}

export default TestBox;
