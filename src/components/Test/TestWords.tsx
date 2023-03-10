import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectWordsList } from "../../store/testSlice";
import { useAppSelector } from "../../store/store";

// const Caret = styled("span", {
//   shouldForwardProp: (prop) => prop !== "left",
//   // shouldForwardProp: (prop) => prop !== "top",
// })<{ left: number; top: number }>(({ theme, top, left }) => ({
//   position: "absolute",
//   display: "inline-block",
//   width: "2.5px",
//   height: "26px",
//   "&:after": {
//     content: '""',
//     color: theme.caret.main,
//     position: "absolute",
//     top: top,
//     left: left,
//     width: "100%",
//     height: "100%",
//     animation: `caret 1s infinite`,
//     backgroundColor: theme.caret.main,
//   },
//   "@keyframes caret": {
//     "0%": {
//       opacity: 1,
//     },
//     "50%": {
//       opacity: 0,
//     },
//     "100%": {
//       opacity: 1,
//     },
//   },
// }));

// function FocusInside() {
//   return (
//     <Box
//       position={"absolute"}
//       sx={{
//         backdropFilter: "blur(4px)",
//         background: "rgba(0, 0, 0, 0.1)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100%",
//         width: "100%",
//       }}
//     >
//       <Typography variant="h6" color={"white"}>
//         Click here or start typing to focus
//       </Typography>
//     </Box>
//   );
// }

const StyledWord = styled("span", {
  shouldForwardProp: (prop) => prop !== "correct" && prop !== "active",
})<{
  correct: boolean | undefined;
  active: boolean;
}>(({ theme, correct, active }) => ({
  color: correct
    ? theme.text.main
    : correct === false
    ? theme.error.main
    : theme.sub.main,
  fontSize: "24px",
  fontWeight: 300,
  lineHeight: "40px",
  letterSpacing: "1px",
  textDecoration: active ? "underline" : "none",
}));

const Word = ({
  text,
  active,
  correct,
  containerHeight,
  scrollContainer,
}: {
  text: string;
  active: boolean;
  correct: boolean | undefined;
  containerHeight: number | undefined;
  scrollContainer: () => void;
}) => {
  const wordRef = useRef<HTMLSpanElement | null>(null);
  const t = wordRef?.current?.getBoundingClientRect();

  useEffect(() => {
    if (t?.top && containerHeight && active && t.top - containerHeight > 80) {
      scrollContainer();
    }
  }, [t?.top, containerHeight, active, scrollContainer]);

  return (
    <StyledWord ref={wordRef} correct={correct} active={active}>
      {text}
    </StyledWord>
  );
};

const MemoizedWord = React.memo(Word);

function TestWords() {
  const wordsList = useSelector(selectWordsList);
  const correctWords = useAppSelector((state) => state.test.correctWords);
  const currentWordIndex = useAppSelector(
    (state) => state.test.currentWordIndex
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    containerRef.current?.scrollTo(0, 0);
  }, [wordsList]);

  const scrollContainer = useCallback(function scrollContainer() {
    if (containerRef?.current) {
      // containerRef.current.scrollTop += 40;
      containerRef.current.scrollBy({
        top: 40,
        left: 0,
        behavior: "smooth",
      });
    }
  }, []);

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
        ref={containerRef}
      >
        {/* <FocusInside /> */}
        {/* <Caret left={caretPosition.left} top={caretPosition.top} /> */}
        {wordsList.map((word, index) => (
          <Box key={index}>
            <MemoizedWord
              text={word}
              active={currentWordIndex === index}
              correct={correctWords[index]}
              containerHeight={
                containerRef?.current?.getBoundingClientRect().top
              }
              scrollContainer={scrollContainer}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default TestWords;
