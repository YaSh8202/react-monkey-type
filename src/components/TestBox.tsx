import Box from "@mui/material/Box";
import React from "react";
import TestWords from "./TestWords";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setUserText, startTest } from "../store/testSlice";
import { useStartTyping } from "react-use";

function TestBox() {
  const dispatch = useAppDispatch();
  const isRunning = useAppSelector((state) => state.test.isRunning);
  console.log(isRunning);
  
  useStartTyping(() => {
    dispatch(startTest());
  });

  return (
    <Box
      sx={{
        justifySelf: "center",
        margin: "auto 0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <input
        type="text"
        style={{ zIndex: -1, color: "black", width: 20 }}
        autoFocus
        tabIndex={0}
        autoComplete="off"
        autoCapitalize="off"
        data-gramm="false"
        list="autocompleteoff"
        onChange={(e) => {
          dispatch(setUserText(e.target.value));
        }}
      />
      <TestWords />
    </Box>
  );
}

export default TestBox;
