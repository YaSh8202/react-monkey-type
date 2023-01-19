import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import React from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useSelector } from "react-redux";
import { selectWordsList } from "../store/testSlice";

const sentence = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore
laborum repudiandae ea sequi! Laboriosam, maxime fugit! Quo id
repudiandae nam impedit neque delectus praesentium vero numquam
asperiores? Quod sint libero culpa aliquid quia suscipit placeat
tempore, voluptate est`;

const words = sentence.split(" ");

const Caret = styled("span")(({ theme }) => ({
  position: "absolute",
  display: "inline-block",
  width: "2.5px",
  height: "26px",
  "&:after": {
    content: '""',
    color: theme.caret.main,
    position: "absolute",
    top: 5,
    left: 55,
    width: "100%",
    height: "100%",
    animation: `caret 1s infinite`,
    backgroundColor: theme.caret.main,
  },
  "@keyframes caret": {
    "0%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
}));

function TestWords() {
  const theme = useTheme();
  const wordsList = useSelector(selectWordsList);

  return (
    <Box
      sx={{
        justifySelf: "center",
        margin: "auto 0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        height={"120px"}
        overflow={"hidden"}
        display={"flex"}
        flexDirection={"row"}
        columnGap={"8px"}
        flexWrap={"wrap"}
      >
        <Caret />
        {wordsList.map((word, index) => (
          <Box key={index} >
            {word.split("").map((letter, index) => (
              <span
                key={index}
                style={{
                  color: theme.sub.main,
                  fontSize: "24px",
                  fontWeight: 400,
                  lineHeight: "40px",
                }}
              >
                {letter}
              </span>
            ))}
          </Box>
        ))}
      </Box>
      <IconButton sx={{ margin: "12px auto" }}>
        <RefreshIcon htmlColor={theme.sub.main} />
      </IconButton>
    </Box>
  );
}

export default TestWords;
