import { Modal, Stack } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { closeModal, setTheme } from "../store/themeSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { styled, useTheme } from "@mui/material/styles";
import { themesMap } from "../styles/theme";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { CustomTheme } from "@/typings";
const SearchInput = styled("input")(({ theme }) => ({
  flex: 1,
  background: "transparent",
  outline: "none",
  border: "none",
  color: theme.text.main,
  fontWeight: 300,
  fontSize: "1rem",
  "&::placeholder": {
    color: theme.sub.main,
    fontWeight: 300,
  },
}));

const SelectThemeBtn = styled("button")(
  ({ theme }) =>
    ({ isSelected: _ }: { isSelected: boolean }) => ({
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: "35px",
      background: "transparent",
      outline: "none",
      border: "none",
      color: theme.text.main,
      "& p,svg": {
        color: theme.text.main,
      },
      "&:hover": {
        background: theme.text.main,
        "& p,svg": {
          color: theme.sub.alt,
        },
      },
    })
);

const ColorCircle = styled("div")(() => ({ color }: { color: string }) => ({
  backgroundColor: color,
  width: 10,
  height: 10,
  display: "flex",
  alignItems: "center",
  borderRadius: 999,
  justifyContent: "center",
}));

const ThemeColorChip = ({ theme }: { theme: CustomTheme }) => {
  return (
    <Box
      sx={{
        padding: "6px 8px",
        backgroundColor: theme.colors.bgColor,
        display: "flex",
        flexDirection: "row",
        gap: 1,
        borderRadius: 1.5,
      }}
    >
      <ColorCircle color={theme.colors.mainColor} />
      <ColorCircle color={theme.colors.subColor} />
      <ColorCircle color={theme.colors.textColor} />
    </Box>
  );
};

const themesList = Object.values(themesMap);

function ThemeModal() {
  const open = useAppSelector((state) => state.theme.themeModalOpen);
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(closeModal());
  const theme = useTheme();
  const currentTheme = useAppSelector((state) => state.theme.theme);
  const [search, setSearch] = useState("");
  const [filteredThemes, setFilteredThemes] =
    useState<CustomTheme[]>(themesList);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setFilteredThemes(
      // Object.values(Themes).filter((t) =>
      //   t.toLowerCase().includes(e.target.value.toLowerCase())
      // )
      themesList.filter((t) =>
        t.title.toLocaleLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      componentsProps={{
        backdrop: {
          sx: {
            // background: "transparent",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw",
          maxWidth: "600px",
          // border: `5px solid ${theme.sub.alt}`,
          // boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.background.main,
          minHeight: 300,
          maxHeight: "80vh",
          overflowY: "hidden",
          borderRadius: "10px",
          outline: `0.25rem solid ${theme.sub.alt}`,
          // boxShadow: ` 0 0 0 calc(4px + 2px) ${theme.sub.alt}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: "50px",
            gap: "5px",
            padding: "0 10px",
          }}
        >
          <SearchIcon
            sx={{
              color: theme.sub.main,
              padding: "0.5px",
            }}
          />
          <SearchInput
            autoFocus
            value={search}
            onChange={searchHandler}
            type="text"
            placeholder="Type to search"
          />
        </Box>
        <Stack
          direction={"column"}
          sx={{
            overflowY: "auto",
          }}
        >
          {filteredThemes.map((t) => (
            <SelectThemeBtn
              key={t.id}
              onClick={() => {
                dispatch(setTheme(t));
              }}
              isSelected={currentTheme.id === t.id}
            >
              <Stack direction={"row"} alignItems={"center"}>
                <CheckRoundedIcon
                  fontSize="small"
                  sx={{
                    color: theme.sub.main,
                    mr: "5px",
                    padding: "0.5px",
                    opacity: currentTheme.id === t.id ? 1 : 0,
                  }}
                />
                <Typography sx={{ justifySelf: "flex-end", fontSize: "14px" }}>
                  {t.title}
                </Typography>
              </Stack>

              <ThemeColorChip theme={t} />
            </SelectThemeBtn>
          ))}
        </Stack>
      </Box>
    </Modal>
  );
}

export default ThemeModal;
