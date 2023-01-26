// This code is the main component of the app, it renders the Navbar, the footer and the content of the page.
// AppWithTheme is a wrapper that adds the theme provider to the app. The theme is set in the store.

import React from "react";
import "./App.css";
import { Box, Container, useMediaQuery } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ModesStack from "./components/ModesStack";
import TestBox from "./components/TestBox";
import { getTheme } from "./styles/theme";
import { useAppSelector } from "./store/store";

function App() {
  const theme = useTheme();

  return (
    <Box
      padding={"24px 0px"}
      margin={0}
      width={"100%"}
      minHeight={"100vh"}
      bgcolor={theme.background.main}
      display={"flex"}
      flexDirection={"column"}
    >
      <Container
        disableGutters={false}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          flex: 1,
        }}
      >
        <Navbar />
        <Box display={"flex"} flexDirection={"column"} flex={1} my={"24px"}>
          <ModesStack />
          <TestBox />
        </Box>
        <Footer />
      </Container>
    </Box>
  );
}

export const AppWithTheme = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  // const isDark = useMediaQuery('(prefers-color-scheme: dark)');
  // console.log(isDark)

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <App />
    </ThemeProvider>
  );
};

export default App;
