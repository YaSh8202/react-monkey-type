import { collection, doc, getDoc } from "firebase/firestore";
import debounce from "lodash.debounce";
import React, { useCallback, useEffect } from "react";
import { firestore } from "../util/firebase";

function useCheckUsername() {
  const [username, setUsername] = React.useState("");
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

  return { username, isValid, loading, onChange };
}

export default useCheckUsername;
