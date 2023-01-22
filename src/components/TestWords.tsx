import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import React from "react";
import { useSelector } from "react-redux";
import { selectWordsList } from "../store/testSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

const Caret = styled("span", {
  shouldForwardProp: (prop) => prop !== "left",
  // shouldForwardProp: (prop) => prop !== "top",
})<{ left: number; top: number }>(({ theme, top, left }) => ({
  position: "absolute",
  display: "inline-block",
  width: "2.5px",
  height: "26px",
  "&:after": {
    content: '""',
    color: theme.caret.main,
    position: "absolute",
    top: top,
    left: left,
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

function FocusInside() {
  return (
    <Box
      position={"absolute"}
      sx={{
        backdropFilter: "blur(4px)",
        background: "rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Typography variant="h6" color={"white"}>
        Click here or start typing to focus
      </Typography>
    </Box>
  );
}

const StyledWord = styled("span", {
  shouldForwardProp: (prop) => prop !== "correct" && prop !== "active",
})<{
  correct: boolean | undefined;
  active: boolean;
}>(({ theme, correct, active }) => ({
  color: correct
    ? theme.main.main
    : correct === false
    ? theme.error.main
    : theme.sub.main,
  fontSize: "24px",
  fontWeight: 400,
  lineHeight: "40px",
  textDecoration: active ? "underline" : "none",
}));

const Word = ({
  text,
  active,
  correct,
}: {
  text: string;
  active: boolean;
  correct: boolean | undefined;
}) => (
  <StyledWord correct={correct} active={active}>
    {text}
  </StyledWord>
);

const MemoizedWord = React.memo(Word);

function TestWords() {
  const wordsList = useSelector(selectWordsList);
  const correctWords = useAppSelector((state) => state.test.correctWords);
  const currentWordIndex = useAppSelector(
    (state) => state.test.currentWordIndex
  );

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
        position={"relative"}
      >
        {/* <FocusInside /> */}
        {/* <Caret left={caretPosition.left} top={caretPosition.top} /> */}
        {wordsList.map((word, index) => (
          <Box key={index}>
            <MemoizedWord
              text={word}
              active={currentWordIndex === index}
              correct={correctWords[index]}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default TestWords;
