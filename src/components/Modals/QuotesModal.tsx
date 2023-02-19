import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MiniSearch from "minisearch";
import englishQuotes from "../../languages/english_quotes.json";
import { Typography } from "@mui/material";
import { StyledInput } from "../Login/Login";
import {
  closeSearchModal,
  quoteLengthOptions,
  setSearchQuote,
} from "../../store/testSlice";
import MultipleSelect from "./MultipleSelect";

function getQuoteGroup(length: number) {
  const allGroups = ["short", "medium", "long", "thicc"];
  const groupRange = englishQuotes.groups;
  const quoteRangeMap = {} as Record<string, [number, number]>;
  allGroups.forEach((group, index) => {
    quoteRangeMap[group] = [groupRange[index][0], groupRange[index][1]];
  });

  const quoteGroup = allGroups.find((group) => {
    const [min, max] = quoteRangeMap[group];
    return length >= min && length <= max;
  });

  return quoteGroup;
}

async function searchQuotes(search: string, filterLength: string[]) {
  if (search.length === 0) {
    if (filterLength.length === 0) return englishQuotes.quotes;
    return englishQuotes.quotes.filter((quote) => {
      const quoteGroup = getQuoteGroup(quote.length);
      return filterLength.includes(quoteGroup!);
    });
  }

  const searchIndex = new MiniSearch<{
    text: string;
    source: string;
    id: number;
    length: number;
  }>({
    fields: ["text", "source"], // fields to index for full-text search
    storeFields: ["text", "source", "id", "length"],
    searchOptions: {
      boost: { text: 1, source: 2 }, // fields to boost for fuzzy search
      prefix: true, // use prefix search
      fuzzy: 0.25,
      combineWith: "AND",
    },
  });

  await searchIndex.addAllAsync(englishQuotes.quotes);

  const searchResults = searchIndex.search(search, {
    filter: (quote) => {
      if (filterLength.length === 0) return true;

      const quoteGroup = getQuoteGroup(quote.length);
      return filterLength.includes(quoteGroup!);
    },
  });
  return searchResults;
}

type searchResultType = Awaited<ReturnType<typeof searchQuotes>>[0];
type quoteType = typeof englishQuotes.quotes[0];

function Quote({ quote }: { quote: searchResultType | quoteType }) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  return (
    <Box
      onClick={() => {
        dispatch(setSearchQuote(quote.text.split(" ")));
      }}
      boxSizing={"border-box"}
      display="flex"
      flexDirection={"column"}
      p={1}
      sx={{
        cursor: "pointer",
        borderRadius: "10px",
        "&:hover": {
          backgroundColor: theme.sub.alt,
          transition: "background-color 0.2s ease-in-out",
        },
      }}
    >
      <Typography
        sx={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          WebkitLineClamp: {
            xs: 2,
            sm: 3,
          },
        }}
        variant="body1"
        color={theme.text.main}
      >
        {quote.text}
      </Typography>
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Box
          flex={1}
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
          flexDirection={"column"}
        >
          <Typography
            sx={{
              opacity: 0.5,
            }}
            color={theme.sub.main}
          >
            id
          </Typography>
          <Typography color={theme.sub.main}>{quote.id}</Typography>
        </Box>
        <Box flex={1} display="flex" flexDirection={"column"}>
          <Typography
            sx={{
              opacity: 0.5,
            }}
            color={theme.sub.main}
          >
            length
          </Typography>
          <Typography color={theme.sub.main}>
            {getQuoteGroup(quote.length)}
          </Typography>
        </Box>
        <Box flex={2} display="flex" flexDirection={"column"}>
          <Typography
            sx={{
              opacity: 0.5,
            }}
            color={theme.sub.main}
          >
            source
          </Typography>
          <Typography color={theme.sub.main}>{quote.source}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

function QuotesModal() {
  const open = useAppSelector((state) => state.test.searchQuoteModal);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [lengthFilter, setLengthFilter] = useState<string[]>([]);


  const [searchResults, setSearchResults] = useState<searchResultType[]>([]);
  useEffect(() => {
    let isCurrent = true;
    searchQuotes(search, lengthFilter).then((res) => {
      if (isCurrent) setSearchResults(res);
    });
    return () => {
      isCurrent = false;
    };
  }, [search, lengthFilter]);

  const handleClose = () => {
    dispatch(closeSearchModal());
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
          maxWidth: "1000px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.background.main,
          height: "80vh",
          borderRadius: "10px",
          outline: `0.25rem solid ${theme.sub.alt}`,
          padding: {
            xs: "1rem",
            sm: "2rem",
          },
        }}
      >
        {/* Head */}
        <Box marginBottom={"1rem"}>
          <Typography variant="h5" color={theme.sub.main}>
            Quote Search
          </Typography>
        </Box>
        {/* search and filter input */}
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={"1rem"}
          sx={{
            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          <StyledInput
            placeholder={"Filter by text"}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              flex: 3,
            }}
          />
          {/* <StyledInput
            placeholder={"Filter by length"}
            sx={{
              flex: 2,
            }}
          /> */}
          <MultipleSelect
            selectedItems={lengthFilter}
            setSelectedItems={setLengthFilter}
            inputLabel={"Filter by length"}
            items={quoteLengthOptions.filter(
              (q) => q !== "search" && q !== "all"
            )}
            
          />
        </Box>
        <Typography
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
          color={theme.sub.main}
          textAlign={"center"}
          mt={1}
        >
          {searchResults.length}
          {` result(s)`}
        </Typography>
        {/* results */}
        <Box
          overflow={"auto"}
          mt={1}
          sx={{
            "&::-webkit-scrollbar": {
              width: "0.5em",
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.sub.main,
              borderRadius: "10px",
            },
          }}
        >
          {searchResults.slice(0, 100).map((quote) => (
            <Quote key={quote.id} quote={quote} />
          ))}
        </Box>
      </Box>
    </Modal>
  );
}

export default QuotesModal;
