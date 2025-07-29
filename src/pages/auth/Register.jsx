import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email is required",
      });
      return;
    }
    if (!password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password is required",
      });
      return;
    }
    try {
      const response = createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleToLogin = () => {
    navigate("/auth/login", { replace: true });
  };
  return (
    <div className="min-h-screen">
      <h1>Register</h1>
      <form className="flex flex-col gap-4 border border-gray-400 p-4 w-1/3">
        <label htmlFor="">User Name</label>
        <input
          type="text"
          placeholder="input User Name here"
          onChange={(e) => setUserName(e.target.value)}
        />
        <label htmlFor="">Email</label>
        <input
          type="email"
          placeholder="input email here"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="input password here"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </form>
      <button onClick={handleToLogin}>Login</button>
    </div>
  );
}
