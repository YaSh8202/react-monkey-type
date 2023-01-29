import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import React, { useState, useEffect, useContext } from "react";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../util/firebase";
import UsernameModal from "./UsernameModal";
import { LoginInput, StyledLoginButton } from "./Login";
import { UserContext } from "../../store/userContext";

function LoginForm() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const { user, username, loading } = useContext(UserContext);

  useEffect(() => {
    if (!loading && user && !username) {
      setShowUsernameModal(true);
    }
  }, [user, username, loading]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password);
  };

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      setShowUsernameModal(true);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Box
      bgcolor={"transparent"}
      display="flex"
      flexDirection={"column"}
      width={"240px"}
    >
      <Typography color={theme.text.main} variant="h6">
        login
      </Typography>
      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <LoginInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          status={undefined}
        />
        <LoginInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          status={undefined}
        />
        <StyledLoginButton>
          <LoginRoundedIcon />
          Sign In
        </StyledLoginButton>
        <span
          style={{
            margin: "4px auto",
            color: theme.text.main,
            fontSize: "0.75rem",
          }}
        >
          or
        </span>
        <StyledLoginButton onClick={signInWithGoogle}>
          <GoogleIcon />
          Google Sign In
        </StyledLoginButton>
      </form>
      <UsernameModal
        open={showUsernameModal}
        handleClose={() => setShowUsernameModal(false)}
      />
    </Box>
  );
}

export default LoginForm;
