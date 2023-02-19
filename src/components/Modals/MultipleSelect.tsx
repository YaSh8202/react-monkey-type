import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, Chip } from "@mui/material";

const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 4;

function getStyles(name: string, items: string[], theme: Theme) {
  const isSelected = items.indexOf(name) > -1;
  return {
    backgroundColor: isSelected ? "red" : theme.background.main,
    color: theme.sub.main,
    "&:hover": {
      backgroundColor: isSelected ? theme.text.main : theme.sub.alt,
    },
  };
}

export default function MultipleSelect({
  items,
  inputLabel,
  selectedItems,
  setSelectedItems,
}: {
  items: string[];
  inputLabel: string;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const theme = useTheme();
  // const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedItems>) => {
    const {
      target: { value },
    } = event;
    setSelectedItems(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    // <div  >
    <FormControl sx={{ m: 0, flex: 2, backgroundColor: theme.sub.alt }}>
      <InputLabel color={"secondary"} id="demo-multiple-name-label">
        {inputLabel}
      </InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={selectedItems}
        onChange={handleChange}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                sx={{
                  color: theme.text.main,
                }}
              />
            ))}
          </Box>
        )}
        input={
          <OutlinedInput
            color={"secondary"}
            sx={{
              backgroundColor: theme.sub.alt,
              color: theme.sub.main,
              "&:placeholder": {
                color: theme.sub.main,
              },
            }}
            label={inputLabel}
          />
        }
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP,
              width: 250,
              backgroundColor: theme.background.main,
            },
          },
        }}
      >
        {items.map((item) => (
          <MenuItem
            key={item}
            value={item}
            disableRipple
            sx={getStyles(item, selectedItems, theme)}
          >
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    // </div>
  );
}
