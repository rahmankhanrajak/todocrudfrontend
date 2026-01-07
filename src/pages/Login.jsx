import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../store/authApi";
import { setCredentials } from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser({ email, password }).unwrap();

    dispatch(
      setCredentials({
        user: res.user,
        accessToken: res.accessToken,
      })
    );

    navigate("/todos");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button>Login</button>
      <p>No account? <Link to="/register">Register</Link></p>
    </form>
  );
}
