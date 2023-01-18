import React from "react";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import HdrAutoIcon from "@mui/icons-material/HdrAuto";
import { styled, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import TagIcon from "@mui/icons-material/Tag";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Box } from "@mui/material";
const CustomButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ theme, active }) => ({
  textTransform: "none",
  backgroundColor: "transparent",
  color: active ? theme.text.main : theme.sub.main,
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
        justifySelf: "flex-start"
      }}
    >
      <ButtonContainer>
        <CustomButton>
          <AlternateEmailIcon fontSize="small" sx={{ padding: 0.35 }} />
          punctuation
        </CustomButton>
        <CustomButton>
          <TagIcon fontSize="small" sx={{ padding: 0.35 }} />
          numbers
        </CustomButton>
      </ButtonContainer>
      <ButtonContainer>
        <CustomButton active>
          <WatchLaterIcon fontSize="small" sx={{ padding: 0.35 }} />
          time
        </CustomButton>
        <CustomButton>
          <HdrAutoIcon fontSize="small" sx={{ padding: 0.35 }} />
          words
        </CustomButton>
        <CustomButton>
          <FormatQuoteIcon fontSize="small" sx={{ padding: 0.35 }} />
          quote
        </CustomButton>
      </ButtonContainer>
      <ButtonContainer>
        <CustomButton active>15</CustomButton>
        <CustomButton>30</CustomButton>
        <CustomButton>60</CustomButton>
        <CustomButton>120</CustomButton>
      </ButtonContainer>
    </Stack>
  );
}

export default ModesStack;
