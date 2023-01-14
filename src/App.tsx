import React from "react";
import "./App.css";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";

function App() {
  const theme = useTheme();

  return (
    <Box
      padding={"24px 0px"}
      margin={0}
      width={"100%"}
      minHeight={"100vh"}
      bgcolor={theme.background.main}
    >
      <Container>
        <Navbar />
      </Container>
    </Box>
  );
}

export default App;
