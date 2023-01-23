import React from "react";
import "./App.css";
import { Box, Container } from "@mui/material";
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
  // const theme = "dracula";
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <App />
    </ThemeProvider>
  );
};

export default App;
