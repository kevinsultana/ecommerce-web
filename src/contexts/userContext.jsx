import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const docSnapRef = await getDoc(doc(db, "users", user.uid));
        if (docSnapRef.exists()) {
          const userData = docSnapRef.data();
          setUserRole(userData.role);
        } else {
          setUserRole(null);
        }
      } else {
        setUserRole(null);
        setUser(null);
      }
    });
    setLoading(false);
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, userRole, setUserRole, loading, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};
