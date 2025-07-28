import React, { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
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
        <button onClick={handleRegister}>Login</button>
      </form>
    </div>
  );
}
