import React from "react";
import { useAppSelector } from "../../store/store";
import { Box } from "@mui/material";
import TestResult from "./TestResult";
import ModesStack from "./ModesStack";
import TestBox from "./TestBox";

function Test() {
  const showResult = useAppSelector((state) => state.test.showResult);

  return (
    <Box display={"flex"} flexDirection={"column"} flex={1} my={"24px"}>
      {showResult ? (
        <TestResult />
      ) : (
        <>
          <ModesStack />
          <TestBox />
        </>
      )}
    </Box>
  );
}

export default Test;
