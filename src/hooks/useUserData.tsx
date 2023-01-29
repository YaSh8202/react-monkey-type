import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, firestore } from "../util//firebase";
import { User, onAuthStateChanged } from "firebase/auth";

export function useUserData() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    let unsubscribe;
    if (user) {
      const ref = doc(collection(firestore, "users"), user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }
    if (user === undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    return unsubscribe;
  }, [user]);

  return { user, username, loading };
}
