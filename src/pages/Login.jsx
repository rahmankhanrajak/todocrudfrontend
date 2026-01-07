import { useState } from "react";
import { useLoginMutation } from "../store/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginUser] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser({ email, password }).unwrap();
      login(res.user, res.accessToken);
      navigate("/todos");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err?.data?.message || "Login failed. Check email/password."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Login</button>

      <p>
        No account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}