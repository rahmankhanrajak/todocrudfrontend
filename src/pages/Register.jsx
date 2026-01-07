import { useState } from "react";
import { useRegisterMutation } from "../store/authApi";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [register] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({ name, email, password }).unwrap();
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button>Register</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </form>
  );
}
