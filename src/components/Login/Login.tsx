import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";

import DoneIcon from "@mui/icons-material/Done";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import { UserContext } from "../../store/userContext";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

export const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const validatePassword = (password: string) => {
  return password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
};

function Login() {
  const { username } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (username) {
      navigate("/");
    }
  }, [username, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        gap: "3rem",
      }}
    >
      <RegisterForm />
      {/* <RegisterForm /> */}
      <LoginForm />
    </Box>
  );
}

export const StyledInput = styled("input")(({ theme }) => ({
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

export const LoginInput: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & { status?: string; message?: string }
> = ({ status, message, ...rest }) => {
  const theme = useTheme();

  return (
    <Box position={"relative"} height={"36px"} boxSizing={"border-box"}>
      <StyledInput {...rest} />
      {status && (
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
      )}
    </Box>
  );
};

export const StyledLoginButton = styled("button")(({ theme }) => ({
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
  "&:hover,&:focus": {
    backgroundColor: theme.text.main,
    color: theme.sub.alt,
  },
  "&:active": {
    backgroundColor: theme.main.main,
    color: theme.sub.alt,
  },
}));

export default Login;
