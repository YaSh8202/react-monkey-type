import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import GoogleIcon from '@mui/icons-material/Google';

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
  > & { status: string }
> = ({ status, ...rest }) => {
  const theme = useTheme();

  return (
    <Box position={"relative"} height={"36px"} boxSizing={"border-box"}>
      <StyledInput {...rest} />
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
        <CloseIcon htmlColor={theme.error.main} />
      </Box>
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
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <LoginInput placeholder="username" status="wrong" />
        <LoginInput placeholder="email" status="wrong" />
        <LoginInput placeholder="verify email" status="wrong" />
        <LoginInput type="password" placeholder="password" status="wrong" />
        <LoginInput placeholder="verify password" status="wrong" />
        <StyledLoginButton>
          <PersonAddAltRoundedIcon />
          Sign Up
        </StyledLoginButton>
      </form>
    </Box>
  );
}
function LoginForm() {
  const theme = useTheme();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <LoginInput placeholder="email" status="wrong" />
        <LoginInput type="password" placeholder="password" status="wrong" />
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
