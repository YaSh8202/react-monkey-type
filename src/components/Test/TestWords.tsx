import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Letter } from "../../typings";
import {  setCaretPosition, setInputFocus } from "../../store/testSlice";

const LINE_HEIGHT = 40;

const Caret = styled("span", {
  // shouldForwardProp: (prop) => prop !== "left",
  // shouldForwardProp: (prop) => prop !== "top",
})<{ left: number; top: number }>(({ theme, top, left }) => ({
  position: "absolute",
  display: "inline-block",
  width: "2.5px",
  height: "26px",
  "&:after": {
    content: '""',
    transition: "all 0.08s ease-in",
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
        // backdropFilter: "blur(4px)",
        // background: "rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "120px",
        width: "100%",
      }}
    >
      <Typography variant="h6" color={"white"}>
        Click here to focus
      </Typography>
    </Box>
  );
}

const Word = ({
  text,
  active,
  correct,
  containerHeight,
  scrollContainer,
}: {
  text: Letter[];
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
    <Box component={"span"} ref={wordRef}>
      {text.map((l, i) => (
        <LetterComponent letter={l} key={i} />
      ))}
    </Box>
  );
};

const LetterComponent = ({ letter }: { letter: Letter }) => {
  const letterRef = useRef<HTMLDivElement>();
  const currentWordIndex = useAppSelector(
    (state) => state.test.currentWordIndex
  );
  const currentCharIndex = useAppSelector(
    (state) => state.test.currentCharIndex
  );
  const dispatch = useAppDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (!letterRef.current) return;

    if (
      currentWordIndex === letter.wordIndex &&
      !letterRef.current.nextSibling &&
      currentCharIndex === letter.charIndex + 1
    ) {
      dispatch(
        setCaretPosition({
          top: letterRef.current.offsetTop,
          left: letterRef.current.offsetLeft + letterRef.current.offsetWidth,
        })
      );
      return;
    }

    if (
      currentWordIndex === letter.wordIndex &&
      currentCharIndex === letter.charIndex
    ) {
      dispatch(
        setCaretPosition({
          top: letterRef.current.offsetTop,
          left: letterRef.current.offsetLeft,
        })
      );
    }
  }, [
    currentCharIndex,
    currentWordIndex,
    dispatch,
    letter.charIndex,
    letter.wordIndex,
  ]);

  const color = {
    correct: theme.text.main,
    wrong: theme.error.main,
    untouched: theme.sub.main,
    extra: theme.error.extra,
  };

  return (
    <Box
      ref={letterRef}
      component={"span"}
      sx={{
        lineHeight: `${LINE_HEIGHT}px`,
        fontSize: "24px",
        color: color[letter.status],
        fontWeight: 300,
        marginRight: "1px",
      }}
    >
      {letter.letter}
    </Box>
  );
};

const MemoizedWord = React.memo(Word);

function TestWords() {
  const wordsList = useAppSelector((state) => state.test.wordsList);
  const correctWords = useAppSelector((state) => state.test.correctWords);
  const currentWords = useAppSelector((state) => state.test.currentWords);
  const showFocusInside = useAppSelector((state) => state.test.isInputFocused);
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(setInputFocus(true));
  };
  console.log("showFocusInside", showFocusInside)

  const currentWordIndex = useAppSelector(
    (state) => state.test.currentWordIndex
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const caretPosition = useAppSelector((state) => state.test.caretPosition);
  console.log("caretPosition", caretPosition);

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
      onClick={onClick}
      sx={{
        justifySelf: "center",
        margin: "auto 0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!showFocusInside && <FocusInside />}

      <Box
        height={"120px"}
        overflow={"hidden"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"flex-start"}
        columnGap={"8px"}
        flexWrap={"wrap"}
        position={"relative"}
        ref={containerRef}
        sx={{
          filter: `blur(${!showFocusInside ? "4px" : "0px"})`,
        }}
      >
        <Caret left={caretPosition.left} top={caretPosition.top} />
        {currentWords.map((word, index) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
            }}
            key={index}
          >
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
