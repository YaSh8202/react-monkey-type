import React from "react";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import HdrAutoIcon from "@mui/icons-material/HdrAuto";
import { styled, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import TagIcon from "@mui/icons-material/Tag";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  setMode2,
  setWordLength,
  toggleNumbers,
  togglePunctuation,
  updateTime,
  wordLengthOptions,
} from "../store/testSlice";
import type { TimeOptionsType, Mode2 } from "../typings";

const CustomButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ theme, active }) => ({
  textTransform: "none",
  backgroundColor: "transparent",
  color: active ? theme.main.main : theme.sub.main,
  outline: "none",
  border: "none",
  fontWeight: "lighter",
  fontSize: "12px",
  borderRadius: "8px",
  lineHeight: "1.25",
  width: "auto",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  transitionDuration: "0.1s",
  transitionProperty: "color",
  transitionTimingFunction: "ease-in-out",
  "&:hover": {
    color: theme.text.main,
  },
}));

const ButtonContainer = styled(Stack)(({ theme }) => ({
  borderRadius: "8px",
  // give last child a separator
  "&>*": {
    padding: "12px 8px 11px",
  },

  "&>:first-of-type": {
    padding: "12px 8px 11px 16px",
  },
  "& > :last-child": {
    padding: "12px 16px 11px 8px",
  },

  "&:not(:last-child) > :last-child": {
    "&::after": {
      content: "''",
      height: "60%",
      width: "4px",
      position: "absolute",
      right: 0,
      top: "20%",
      backgroundColor: theme.background.main,
    },
  },
  backgroundColor: "transparent",
  flexDirection: "row",
  alignItems: "center",
}));
function ModesStack() {
  const theme = useTheme();
  const isRunning = useAppSelector((state) => state.test.isRunning);
  const time = useAppSelector((state) => state.test.time);
  const punctuation = useAppSelector((state) => state.test.punctuation);
  const numbers = useAppSelector((state) => state.test.numbers);
  const mode2 = useAppSelector((state) => state.test.mode2);
  const wordLength = useAppSelector((state) => state.test.wordLength);
  const dispatch = useAppDispatch();
  return (
    <Stack
      sx={{
        flexDirection: {
          xs: "column",
          md: "row",
        },
        alignItems: {
          xs: "center",
          md: "center",
        },
        backgroundColor: theme.sub.alt,
        margin: "0 auto",
        color: theme.sub.main,
        borderRadius: "8px",
        justifySelf: "flex-start",
        "@keyframes fadeOut": {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
        "@keyframes fadeIn": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        animation: isRunning
          ? "fadeOut 0.5s ease-in-out forwards"
          : "fadeIn 0.5s ease-in-out forwards",
      }}
    >
      <ButtonContainer>
        <CustomButton
          onClick={() => dispatch(togglePunctuation())}
          active={punctuation}
        >
          <AlternateEmailIcon fontSize="small" sx={{ padding: 0.35 }} />
          punctuation
        </CustomButton>

        <CustomButton
          onClick={() => dispatch(toggleNumbers())}
          active={numbers}
        >
          <TagIcon fontSize="small" sx={{ padding: 0.35 }} />
          numbers
        </CustomButton>
      </ButtonContainer>
      <ButtonContainer>
        <CustomButton
          active={mode2 === "time"}
          onClick={() => dispatch(setMode2("time" as Mode2.time))}
        >
          <WatchLaterIcon fontSize="small" sx={{ padding: 0.35 }} />
          time
        </CustomButton>
        <CustomButton
          active={mode2 === "words"}
          onClick={() => dispatch(setMode2("words" as Mode2.words))}
        >
          <HdrAutoIcon fontSize="small" sx={{ padding: 0.35 }} />
          words
        </CustomButton>
        <CustomButton
          active={mode2 === "quote"}
          onClick={() => dispatch(setMode2("quote" as Mode2.quote))}
        >
          <FormatQuoteIcon fontSize="small" sx={{ padding: 0.35 }} />
          quote
        </CustomButton>
      </ButtonContainer>
      <ButtonContainer>
        {mode2 === "time" &&
          [15, 30, 60, 120].map((t) => {
            return (
              <CustomButton
                key={t}
                active={t === time}
                onClick={() => dispatch(updateTime(t as TimeOptionsType))}
              >
                {t}
              </CustomButton>
            );
          })}
        {mode2 === "words" &&
          wordLengthOptions.map((w) => {
            return (
              <CustomButton
                key={w}
                active={w === wordLength}
                onClick={() => dispatch(setWordLength(w))}
              >
                {w}
              </CustomButton>
            );
          })}
      </ButtonContainer>
    </Stack>
  );
}

export default ModesStack;
