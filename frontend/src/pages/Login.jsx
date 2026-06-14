import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getError } from "../utils/toast";

const Login = () => {
  const [form, setForm] = useState({ email: "admin@nayepankh.org", password: "admin123" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const user = await login(form);
      navigate(user.role === "admin" ? "/admin" : "/volunteer");
    } catch (err) {
      setError(getError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <motion.form className="auth-card glass" onSubmit={submit} initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }}>
        <span className="form-icon"><LogIn /></span>
        <h2>Welcome back</h2>
        <p>Login to continue your volunteer journey.</p>
        {error && <div className="alert error">{error}</div>}
        <label>Email<input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        <button className="primary-btn full" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        <small>New here? <Link to="/register">Create account</Link></small>
      </motion.form>
    </section>
  );
};

export default Login;
