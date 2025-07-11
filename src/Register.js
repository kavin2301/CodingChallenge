import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/register", form);
      setMessage("User registered successfully");
    } catch {
      setMessage("Registration failed");
    }
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h4 className="card-title text-center mb-4">Register</h4>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label>Username</label>
            <input name="username" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" name="password" className="form-control" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
      </div>
    </div>
  );
}
