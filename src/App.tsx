// This code is the main component of the app, it renders the Navbar, the footer and the content of the page.
// AppWithTheme is a wrapper that adds the theme provider to the app. The theme is set in the store.

import React, { useContext, useEffect } from "react";
import "./App.css";
import { Box, Container } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { getTheme } from "./styles/theme";
import { useAppDispatch, useAppSelector } from "./store/store";
import { resetTest } from "./store/testSlice";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Test from "./components/Test/Test";
import Login from "./components/Login/Login";
import { UserContext, UserContextProvider } from "./store/userContext";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "./util/firebase";
import GoogleOneTapLogin from "react-google-one-tap-login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      { path: "/", element: <Test /> },
      { path: "/login", element: <Login /> },
      { path: "*", element: "Not Found" },
    ],
  },
]);

function App() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { user, username, loading } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(resetTest());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading && user && !username) {
        navigate("/login");
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [loading, user, username, navigate]);

  return (
    <Box
      padding={"24px 0px"}
      margin={0}
      width={"100%"}
      minHeight={"100vh"}
      bgcolor={theme.background.main}
      display={"flex"}
      flexDirection={"column"}
      overflow={"hidden"}
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
        <Outlet />
        <Footer />
      </Container>
      {!user && !loading && (
        <GoogleOneTapLogin
          onError={(error: any) => console.log(error)}
          onSuccess={(response: any) => console.log(response)}
          googleAccountConfigs={{
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
            callback: async ({ clientId, credential, select_by }) => {
              console.log("credentiaL\n", credential, select_by);
              const googleCredential =
                GoogleAuthProvider.credential(credential);
              await signInWithCredential(auth, googleCredential);
            },
          }}
          disabled={!!user}
        />
      )}
    </Box>
  );
}

export const AppWithTheme = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  // const isDark = useMediaQuery('(prefers-color-scheme: dark)');
  // console.log(isDark)

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </ThemeProvider>
  );
};

export default App;
