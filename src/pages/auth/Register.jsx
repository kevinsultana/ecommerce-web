import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
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
    setLoadingBtn(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", response.user.uid), {
        userName: userName,
        email: response.user.email,
        role: "user",
        photoProfile: "",
      });
      setLoadingBtn(false);
      Swal.fire("Register Success!");
      navigate("/", { replace: true });
    } catch (error) {
      setLoadingBtn(false);
      let message = "Register Failed";
      if (error.code === "auth/email-already-in-use") {
        message = "Email already in use";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email";
      } else if (error.code === "auth/weak-password") {
        message = "Weak password";
      }
      Swal.fire(message);
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
        <button onClick={handleRegister}>
          {loadingBtn ? (
            <span className="loading loading-dots loading-sm"></span>
          ) : (
            "Register"
          )}
        </button>
      </form>
      <button onClick={handleToLogin}>Login</button>
    </div>
  );
}
