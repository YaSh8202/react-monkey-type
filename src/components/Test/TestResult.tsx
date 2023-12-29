import { Box, Grid, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton/IconButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  rawWpmSelector,
  resetTest,
  wpmSelector,
} from "../../store/testSlice";
import WpmChart from "./WpmChart";
const StatBox = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography
        sx={{
          fontSize: "1rem",
          lineHeight: "1",
          paddingBottom: "4px",
        }}
        color={theme.sub.main}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "2rem",
          lineHeight: "1",
        }}
        color={theme.main.main}
      >
        {value}
      </Typography>
    </Box>
  );
};

function TestResult() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const wpm = useAppSelector(wpmSelector);
  const mode2 = useAppSelector((state) => state.test.mode2);
  const time = useAppSelector((state) => state.test.time);
  const rawWpm = useAppSelector(rawWpmSelector);
  const accuracy = Math.round(wpm/rawWpm * 100);
  const timerCount = useAppSelector((state) => state.test.timerCount);
  const wordLength = useAppSelector((state) => state.test.wordLength);
  const quoteLength = useAppSelector((state) => state.test.quoteLength);

  return (
    <Box
      sx={{
        // justifySelf: "center",
        margin: "auto 0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid container spacing={2}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 0,
          }}
          item
          xs={12}
          md={2}
        >
          <Box display={"flex"} flexDirection={"column"} >
            <Typography
              sx={{
                fontSize: "2rem",
                lineHeight: "1",
              }}
              variant="h4"
              color={theme.sub.main}
            >
              wpm
            </Typography>
            <Typography
              sx={{
                fontSize: "4rem",
                lineHeight: "1",
                marginBottom: "0.5rem",
              }}
              variant="h2"
              color={theme.main.main}
            >
              {Math.round(wpm)}
            </Typography>
          </Box>
          <Box marginBottom={"1rem"}  >
            <Typography
              sx={{
                fontSize: "2rem",
                lineHeight: "1",
              }}
              variant="h4"
              color={theme.sub.main}
            >
              acc
            </Typography>
            <Typography
              sx={{
                fontSize: "4rem",
                lineHeight: "1",
              }}
              variant="h2"
              color={theme.main.main}
            >
              {accuracy}%
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "1rem",
                lineHeight: "1",
                paddingBottom: "4px",
              }}
              variant="body1"
              color={theme.sub.main}
            >
              test type
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                lineHeight: "1",
              }}
              color={theme.main.main}
            >
              {mode2}&nbsp;
              {mode2 === "time"
                ? time
                : mode2 === "words"
                ? wordLength
                : quoteLength}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={10}>
          <Box height={"220px"} boxSizing={"border-box"}>
            <WpmChart />
          </Box>
          <Stack
            width={"100%"}
            direction={"row"}
            justifyContent={"space-evenly"}
            marginTop={"1rem"}
          >
            <StatBox title={"raw"} value={rawWpm} />
            {/* <StatBox title={"consistency"} value={"82%"} /> */}
            <StatBox title={"time"} value={timerCount.toString() + "s"} />
            {/* <StatBox title={"raw"} value={"85"} /> */}
          </Stack>
        </Grid>
      </Grid>
      <Tooltip
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
        title="Next test"
      >
        <IconButton
          tabIndex={1}
          onClick={() => {
            dispatch(resetTest());
            // inputRef.current?.focus();
          }}
          focusRipple={false}
          disableRipple
          sx={{
            margin: "1.5rem auto",
            padding: "8px 2rem",
            borderRadius: "20px",
            color: theme.sub.main,
            "&:active": {
              backgroundColor: theme.main.main,
              color: theme.sub.alt,
            },
          }}
        >
          <NavigateNextIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default TestResult;
