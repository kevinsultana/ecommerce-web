import React from "react";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    auth.signOut().then(() => {
      navigate("/auth/login", { replace: true });
    });
  };
  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
}
