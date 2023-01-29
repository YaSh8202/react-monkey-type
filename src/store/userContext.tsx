import React, { createContext } from "react";
import { useUserData } from "../hooks/useUserData";
import { User } from "firebase/auth";

export const UserContext = createContext<{
  user: User | null | undefined;
  username: string | null;
  loading: boolean;
}>({
  user: null,
  username: null,
  loading: true,
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, username, loading } = useUserData();

  return (
    <UserContext.Provider
      value={{
        user,
        username,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
