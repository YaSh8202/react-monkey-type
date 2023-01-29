import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../util/firebase";
import { collection, doc, writeBatch } from "firebase/firestore";
import useCheckUsername from "../../hooks/useCheckUsername";
import {
  LoginInput,
  StyledLoginButton,
  validateEmail,
  validatePassword,
} from "./Login";

function RegisterForm() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const { username, isValid, loading, onChange } = useCheckUsername();

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
              ? email === verifyEmail
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
              ? password === verifyPassword
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
export default RegisterForm;
