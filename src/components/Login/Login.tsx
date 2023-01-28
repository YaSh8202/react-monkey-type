import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import React, { useCallback, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import GoogleIcon from "@mui/icons-material/Google";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../util/firebase";
import DoneIcon from "@mui/icons-material/Done";
import CircularProgress from "@mui/material/CircularProgress";
import debounce from "lodash.debounce";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import Tooltip from "@mui/material/Tooltip";
const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const validatePassword = (password: string) => {
  return password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
};

function Login() {
  return (
    <Box display={"flex"} justifyContent={"space-around"}>
      <RegisterForm />
      {/* <RegisterForm /> */}
      <LoginForm />
    </Box>
  );
}

const StyledInput = styled("input")(({ theme }) => ({
  backgroundColor: theme.sub.alt,
  border: "none",
  outline: "none",
  color: theme.text.main,
  fontSize: "1.1rem",
  lineHeight: "1.25",
  padding: "8px 33px 8px 8px",
  width: "100%",
  borderRadius: "8px",
  height: "100%",
  boxSizing: "border-box",
  "&::placeholder": {
    color: theme.sub.main,
    opacity: 0.8,
    fontWeight: 300,
  },
}));

const LoginInput: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & { status?: string; message?: string }
> = ({ status, message, ...rest }) => {
  const theme = useTheme();

  return (
    <Box position={"relative"} height={"36px"} boxSizing={"border-box"}>
      <StyledInput {...rest} />
      <Tooltip title={status === "wrong" ? message : ""}>
        <Box
          position={"absolute"}
          right={"0px"}
          top={0}
          height={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width="33px"
        >
          {status === "wrong" ? (
            <CloseIcon fontSize="small" htmlColor={theme.error.main} />
          ) : status === "correct" ? (
            <DoneIcon fontSize="small" htmlColor={theme.main.main} />
          ) : status === "loading" ? (
            <CircularProgress size={"15px"} />
          ) : null}
        </Box>
      </Tooltip>
    </Box>
  );
};

const StyledLoginButton = styled("button")(({ theme }) => ({
  backgroundColor: theme.sub.alt,
  border: "none",
  outline: "none",
  width: "100%",
  height: "36px",
  borderRadius: "8px",
  color: theme.text.main,
  fontSize: "1.1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.text.main,
    color: theme.sub.alt,
  },
}));

function RegisterForm() {
  const theme = useTheme();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [verifyEmail, setVerifyEmail] = React.useState("");
  const [verifyPassword, setVerifyPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    // force form  value typed in form to match correct format
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // only set form value if length is <3 or it passes regex

    if (val.length < 3) {
      setUsername(val);
      setLoading(false);
      setIsValid(false);
    }
    if (re.test(val)) {
      setUsername(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(username);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const ref = doc(collection(firestore, "usernames"), username);
        const docSnap = await getDoc(ref);
        setIsValid(!docSnap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  async function registerHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password || !username || !verifyEmail || !verifyPassword) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      const userDoc = doc(collection(firestore, "users"), user.uid);
      const usernameDoc = doc(collection(firestore, "usernames"), username);
      const batch = writeBatch(firestore);
      batch.set(userDoc, {
        username: username,
      });
      batch.set(usernameDoc, { uid: user.uid });

      await batch.commit();
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
        register
      </Typography>
      <form
        onSubmit={registerHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <LoginInput
          value={username}
          onChange={onChange}
          placeholder="username"
          status={
            username.length > 0
              ? loading
                ? "loading"
                : isValid
                ? "correct"
                : "wrong"
              : undefined
          }
          message={
            username.length < 3
              ? "username must be at least 3 characters"
              : "username already taken"
          }
        />
        <LoginInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          status={
            email.length > 0
              ? validateEmail(email)
                ? "correct"
                : "wrong"
              : undefined
          }
          message={"invalid email"}
        />
        <LoginInput
          value={verifyEmail}
          onChange={(e) => setVerifyEmail(e.target.value)}
          placeholder="verify email"
          status={
            email.length > 0
              ? email === verifyEmail && email.length > 0
                ? "correct"
                : "wrong"
              : undefined
          }
        />
        <LoginInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          status={
            password.length > 0
              ? validatePassword(password)
                ? "correct"
                : "wrong"
              : undefined
          }
          message={
            password.length < 8
              ? "password must be at least 8 characters"
              : "password must contain at least 1 number, 1 uppercase, and 1 lowercase letter"
          }
        />
        <LoginInput
          value={verifyPassword}
          type={"password"}
          onChange={(e) => setVerifyPassword(e.target.value)}
          placeholder="verify password"
          status={
            password.length > 0
              ? password === verifyPassword && password.length > 0
                ? "correct"
                : "wrong"
              : undefined
          }
          message="passwords must match"
        />
        <StyledLoginButton type={"submit"}>
          <PersonAddAltRoundedIcon />
          Sign Up
        </StyledLoginButton>
      </form>
    </Box>
  );
}
function LoginForm() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userCredential = await signInWithEmailAndPassword(auth, email,password);
    const user = userCredential.user;
    console.log(user);
  };

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
          status={
            email.length > 0
              ? validateEmail(email)
                ? "correct"
                : "wrong"
              : undefined
          }
        />
        <LoginInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          status={
            password.length > 0
              ? validatePassword(password)
                ? "correct"
                : "wrong"
              : undefined
          }
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
        <StyledLoginButton>
          <GoogleIcon />
          Google Sign In
        </StyledLoginButton>
      </form>
    </Box>
  );
}

export default Login;
