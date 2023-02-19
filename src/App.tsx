// This code is the main component of the app, it renders the Navbar, the footer and the content of the page.
// AppWithTheme is a wrapper that adds the theme provider to the app. The theme is set in the store.

import React, { useContext, useEffect, useMemo, useState } from "react";
import "./App.css";
import { Box, Container } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { getTheme } from "./styles/theme";
import { useAppDispatch, useAppSelector } from "./store/store";
import { resetTest } from "./store/testSlice";
import ReactDOMServer from "react-dom/server";
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
import { useFavicon } from "react-use";

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

function encodeSvg(color: string) {
  const reactElement = (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="700.000000pt"
      height="700.000000pt"
      viewBox="0 0 700.000000 700.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,700.000000) scale(0.100000,-0.100000)"
        fill={color}
        stroke="none"
      >
        <path
          d="M1539 6986 c-2 -2 -26 -6 -54 -9 -177 -19 -451 -124 -638 -244 -487
-314 -792 -800 -821 -1313 -30 -518 -30 -3420 -1 -3825 13 -174 18 -210 52
-325 136 -469 470 -864 920 -1085 117 -57 201 -89 364 -139 l106 -32 2044 1
2044 1 165 56 c384 129 623 285 863 562 164 190 320 500 362 721 46 237 50
420 50 2130 0 1354 -5 1789 -21 1940 -3 28 -6 57 -6 65 1 55 -45 258 -74 338
-48 128 -153 329 -222 426 -112 157 -376 399 -547 502 -85 51 -213 109 -380
172 l-160 60 -2021 1 c-1112 0 -2023 -1 -2025 -3z m4136 -2038 c4 -3 6 -137 6
-296 l-1 -290 207 0 c115 -1 231 -1 258 -1 l50 -1 -2 -213 c-1 -116 -2 -231
-2 -254 l-1 -43 -255 0 -255 0 1 -895 c0 -492 -2 -899 -5 -903 -3 -5 -492 -8
-528 -3 -3 1 -6 387 -7 859 0 471 0 876 0 900 l-1 42 -228 0 -227 0 0 255 0
255 35 1 c19 0 122 0 228 0 173 0 192 2 193 17 0 9 0 141 1 292 0 151 4 277 8
280 12 7 518 5 525 -2z m-3311 -569 c86 -15 193 -57 258 -101 80 -53 180 -158
214 -223 16 -30 33 -55 37 -55 15 0 69 42 152 119 203 187 402 273 640 275
267 4 402 -49 564 -219 114 -121 159 -199 185 -328 35 -170 41 -310 51 -1117
4 -283 8 -552 9 -597 3 -76 1 -82 -18 -85 -18 -3 -467 -2 -531 1 -21 1 -21 4
-22 499 0 485 -8 907 -19 1027 -10 118 -96 244 -200 292 -39 18 -77 25 -155
29 -239 14 -377 -58 -499 -260 l-53 -89 -3 -156 c-3 -147 -12 -982 -13 -1231
l-1 -115 -243 1 c-133 1 -254 2 -268 3 l-25 1 -2 543 c-1 725 -6 855 -39 1017
-18 93 -44 143 -97 192 -125 117 -332 135 -521 44 -87 -42 -141 -88 -182 -158
-60 -99 -62 -122 -79 -1063 -4 -214 -7 -429 -8 -477 l-1 -88 -40 -1 c-22 -1
-67 -2 -100 -4 -33 -1 -139 -4 -235 -6 l-175 -4 2 585 c2 1011 8 1701 13 1710
3 4 102 11 220 15 280 9 289 9 294 4 2 -2 6 -60 7 -129 3 -127 6 -160 18 -160
3 0 29 21 56 46 261 236 509 317 809 263z"
        />
      </g>
    </svg>
  );
  return (
    "data:image/svg+xml," +
    escape(ReactDOMServer.renderToStaticMarkup(reactElement))
  );
}

export const AppWithTheme = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const muiTheme = useMemo(() => getTheme(theme), [theme]);
  const [faviconLink, setFaviconLink] = useState<string>(
    encodeSvg(muiTheme.main.main as string)
  );
  useFavicon(faviconLink!);

  useEffect(() => {
    setFaviconLink(encodeSvg(muiTheme.main.main as string));
  }, [muiTheme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </ThemeProvider>
  );
};

export default App;
