import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import api from "../api/axios";
import { getError } from "../utils/toast";

const initial = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  age: "",
  gender: "Prefer not to say",
  interestArea: "Education",
  availability: "Flexible",
  skills: "Teaching, Communication",
  motivation: ""
};

const VolunteerForm = () => {
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setMessage("");
      const payload = { ...form, age: Number(form.age), skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean) };
      await api.post("/volunteers", payload);
      setMessage("Application submitted successfully. Admin will review it soon.");
      setForm(initial);
    } catch (err) {
      setError(getError(err));
    } finally {
      setLoading(false);
    }
  };

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section className="form-page">
      <motion.div className="form-header" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <p className="section-tag">Volunteer Registration</p>
        <h1>Tell us how you want to create impact</h1>
        <p>Your information will be stored securely in MongoDB and visible to the admin dashboard.</p>
      </motion.div>
      <motion.form className="volunteer-form glass" onSubmit={submit} initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        {message && <div className="alert success">{message}</div>}
        {error && <div className="alert error">{error}</div>}
        <div className="grid-2">
          <label>Full Name<input name="fullName" value={form.fullName} onChange={update} required /></label>
          <label>Email<input name="email" value={form.email} onChange={update} required /></label>
          <label>Phone<input name="phone" value={form.phone} onChange={update} required /></label>
          <label>Age<input name="age" type="number" value={form.age} onChange={update} required /></label>
          <label>City<input name="city" value={form.city} onChange={update} required /></label>
          <label>State<input name="state" value={form.state} onChange={update} required /></label>
          <label>Gender<select name="gender" value={form.gender} onChange={update}><option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option></select></label>
          <label>Interest Area<select name="interestArea" value={form.interestArea} onChange={update}><option>Education</option><option>Fundraising</option><option>Social Media</option><option>Field Work</option><option>Events</option><option>Content</option><option>Operations</option></select></label>
          <label>Availability<select name="availability" value={form.availability} onChange={update}><option>Weekdays</option><option>Weekends</option><option>Flexible</option></select></label>
          <label>Skills<input name="skills" value={form.skills} onChange={update} placeholder="Teaching, Canva, Writing" /></label>
        </div>
        <label>Motivation<textarea name="motivation" value={form.motivation} onChange={update} required placeholder="Why do you want to join NayePankh Foundation?" /></label>
        <button className="primary-btn full" disabled={loading}>{loading ? "Submitting..." : <>Submit Application <Send size={18} /></>}</button>
      </motion.form>
    </section>
  );
};

export default VolunteerForm;
