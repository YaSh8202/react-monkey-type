import React from "react";
import "./App.css";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import TestWords from "./components/TestWords";
import Footer from "./components/Footer";
import ModesStack from "./components/ModesStack";

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
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          flex: 1,
          padding: "0px",
        }}
      >
        <Navbar />
        <Box display={"flex"} flexDirection={"column"} flex={1} my={"24px"}>
          <ModesStack />
          <TestWords />
        </Box>
        <Footer />
      </Container>
    </Box>
  );
}

export default App;
