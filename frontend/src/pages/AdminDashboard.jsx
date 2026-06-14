import { motion } from "framer-motion";
import { Download, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import api from "../api/axios";
import { getError } from "../utils/toast";

const statusOptions = ["All", "Pending", "Approved", "Rejected"];
const areaOptions = ["All", "Education", "Fundraising", "Social Media", "Field Work", "Events", "Content", "Operations"];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [filters, setFilters] = useState({ search: "", status: "All", interestArea: "All" });
  const [error, setError] = useState("");

  const loadStats = async () => {
    const res = await api.get("/reports/dashboard");
    setStats(res.data);
  };

  const loadVolunteers = async () => {
    const res = await api.get("/volunteers", { params: filters });
    setVolunteers(res.data);
  };

  useEffect(() => {
    Promise.all([loadStats(), loadVolunteers()]).catch((err) => setError(getError(err)));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => loadVolunteers().catch((err) => setError(getError(err))), 350);
    return () => clearTimeout(timeout);
  }, [filters]);

  const monthlyData = useMemo(() => {
    return (stats?.monthly || []).map((x) => ({ name: `${x._id.month}/${x._id.year}`, volunteers: x.count }));
  }, [stats]);

  const updateStatus = async (id, status) => {
    await api.patch(`/volunteers/${id}/status`, { status });
    await Promise.all([loadStats(), loadVolunteers()]);
  };

  const remove = async (id) => {
    if (!confirm("Delete this volunteer?")) return;
    await api.delete(`/volunteers/${id}`);
    await Promise.all([loadStats(), loadVolunteers()]);
  };

  const exportReport = async () => {
    const res = await api.get("/reports/volunteers-json", { responseType: "blob" });
    const url = URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "nayepankh-volunteers-report.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="dashboard-page">
      <motion.div className="dashboard-header" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <p className="section-tag">Admin Dashboard</p>
          <h1>Volunteer analytics & reports</h1>
        </div>
        <button className="secondary-btn" onClick={exportReport}><Download size={18} /> Export JSON</button>
      </motion.div>

      {error && <div className="alert error">{error}</div>}

      <div className="stat-grid">
        {stats && Object.entries(stats.cards).map(([key, value]) => (
          <motion.div className="stat-card glass" key={key} whileHover={{ y: -6 }}>
            <span>{key.replace(/([A-Z])/g, " $1")}</span>
            <b>{value}</b>
          </motion.div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card glass">
          <h3>Monthly registrations</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyData}>
              <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="volunteers" stroke="#8b5cf6" fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card glass">
          <h3>Interest areas</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={(stats?.byArea || []).map((x) => ({ name: x._id, value: x.count }))} dataKey="value" nameKey="name" outerRadius={90} label>
                {(stats?.byArea || []).map((_, i) => <Cell key={i} fill={["#8b5cf6", "#ec4899", "#06b6d4", "#22c55e", "#f59e0b", "#ef4444", "#14b8a6"][i % 7]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="table-card glass">
        <div className="table-toolbar">
          <div className="searchbox"><Search size={18} /><input placeholder="Search name, city, email" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} /></div>
          <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>{statusOptions.map((x) => <option key={x}>{x}</option>)}</select>
          <select value={filters.interestArea} onChange={(e) => setFilters({ ...filters, interestArea: e.target.value })}>{areaOptions.map((x) => <option key={x}>{x}</option>)}</select>
        </div>

        <div className="responsive-table">
          <table>
            <thead><tr><th>Name</th><th>City</th><th>Area</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {volunteers.map((v) => (
                <tr key={v._id}>
                  <td><b>{v.fullName}</b><small>{v.email}</small></td>
                  <td>{v.city}</td>
                  <td>{v.interestArea}</td>
                  <td><span className={`pill ${v.status.toLowerCase()}`}>{v.status}</span></td>
                  <td className="actions">
                    <select value={v.status} onChange={(e) => updateStatus(v._id, e.target.value)}><option>Pending</option><option>Approved</option><option>Rejected</option></select>
                    <button onClick={() => remove(v._id)} className="icon-btn"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
