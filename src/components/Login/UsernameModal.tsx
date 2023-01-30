import React, { useContext } from "react";
import { Modal, Box, useTheme, Typography } from "@mui/material";
import { LoginInput, StyledLoginButton } from "./Login";
import useCheckUsername from "../../hooks/useCheckUsername";
import { UserContext } from "../../store/userContext";
import { collection, doc, writeBatch } from "firebase/firestore";
import { firestore } from "../../util/firebase";

const UsernameModal: React.FunctionComponent<{
  open: boolean;
  handleClose: () => void;
}> = ({ open, handleClose }) => {
  const theme = useTheme();
  const { username, isValid, onChange, loading } = useCheckUsername();
  const { user } = useContext(UserContext);

  const signupHandler = async () => {
    handleClose();
    if (!user) return;
    try {
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
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      componentsProps={{
        backdrop: {
          sx: {
            // background: "transparent",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          maxWidth: "80vw",
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.background.main,
          maxHeight: "80vh",
          borderRadius: "10px",
          outline: `0.25rem solid ${theme.sub.alt}`,
          padding: "2rem",
        }}
      >
        <Typography variant="h5" color={theme.sub.main}>
          Account Name
        </Typography>
        <Typography py={1} color={theme.main.main}>
          You need to choose a username before continuing
        </Typography>
        <LoginInput
          placeholder="username"
          onChange={onChange}
          value={username}
          status={
            username.length > 0
              ? loading
                ? "loading"
                : isValid
                ? "correct"
                : "wrong"
              : undefined
          }
        />
        <StyledLoginButton
          onClick={signupHandler}
          sx={{
            marginTop: "2rem",
          }}
        >
          Sign up
        </StyledLoginButton>
      </Box>
    </Modal>
  );
};

export default UsernameModal;
