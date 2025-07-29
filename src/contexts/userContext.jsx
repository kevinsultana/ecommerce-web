import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const docSnapRef = await getDoc(doc(db, "users", user.uid));
        if (docSnapRef.exists()) {
          const userData = docSnapRef.data();
          setUserRole(userData.role);
          setUserData(userData);
        } else {
          setUserRole(null);
          setUserData(null);
        }
      } else {
        setUserRole(null);
        setUserData(null);
        setUser(null);
      }
    });
    setLoading(false);
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userRole,
        setUserRole,
        loading,
        setLoading,
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
