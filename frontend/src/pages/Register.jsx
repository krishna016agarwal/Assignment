import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getError } from "../utils/toast";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await register(form);
      navigate("/volunteer");
    } catch (err) {
      setError(getError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <motion.form className="auth-card glass" onSubmit={submit} initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }}>
        <span className="form-icon"><UserPlus /></span>
        <h2>Create your account</h2>
        <p>Register first, then submit your volunteer application.</p>
        {error && <div className="alert error">{error}</div>}
        <label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label>Email<input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        <button className="primary-btn full" disabled={loading}>{loading ? "Creating..." : "Create Account"}</button>
        <small>Already have account? <Link to="/login">Login</Link></small>
      </motion.form>
    </section>
  );
};

export default Register;
