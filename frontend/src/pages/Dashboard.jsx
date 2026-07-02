import { useEffect, useState } from "react";
import {
  Shield,
  Search,
  Server,
  AlertTriangle,
  Activity,
  LogOut,
  Download,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { scanTarget, getHistory, downloadReport } from "../services/api";

export default function Dashboard({ setIsLoggedIn }) {
  const [target, setTarget] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedScan, setSelectedScan] = useState(null);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scrollToSection = (sectionClass, menuName) => {
    setActiveMenu(menuName);

    if (sectionClass === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document
      .querySelector(sectionClass)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "Critical":
        return "#ef4444";
      case "High":
        return "#f97316";
      case "Medium":
        return "#eab308";
      default:
        return "#22c55e";
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case "Critical":
        return "🔴";
      case "High":
        return "🟠";
      case "Medium":
        return "🟡";
      default:
        return "🟢";
    }
  };

  const getFallbackPortLabel = (port) => {
    const labels = {
      21: "Weak file transfer risk",
      22: "Brute-force login risk",
      23: "Unencrypted Telnet access",
      25: "Email abuse or spam relay risk",
      53: "DNS amplification attack risk",
      80: "Unencrypted HTTP traffic",
      110: "Unencrypted email retrieval risk",
      143: "IMAP mail exposure risk",
      443: "HTTPS exposed; verify SSL/TLS configuration",
      445: "SMB ransomware and lateral movement risk",
      3306: "Public database exposure risk",
      3389: "RDP brute-force and remote access risk",
    };

    return labels[port] || "Service exposure should be reviewed";
  };

  const renderPorts = (ports) => {
    if (!ports || ports.length === 0) {
      return <p>No open ports detected.</p>;
    }

    return ports.map((p, i) => {
      const level = p.port_risk_level || p.risk_level || "Low";
      const label =
        p.port_risk_label || p.risk_label || getFallbackPortLabel(p.port);

      return (
        <div className="port-row premium-port" key={i}>
          <div className="port-header">
            <span className="port-number">{p.port}</span>
            <span className="port-service">{p.service}</span>
            <span className="port-risk" style={{ color: getRiskColor(level) }}>
              {getRiskIcon(level)} {level}
            </span>
          </div>

          <p className="port-desc">→ {label}</p>
        </div>
      );
    });
  };

  const loadHistory = async () => {
    try {
      const res = await getHistory();
      setHistory(res.data);
    } catch {
      setHistory([]);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleScan = async (e) => {
    e.preventDefault();

    if (!target.trim()) {
      setError("Enter domain or IP address");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await scanTarget(target);
      setResult(res.data);
      setTarget("");

      await loadHistory();

      setTimeout(() => {
        document
          .querySelector(".result-grid")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } catch (err) {
      setError(err.response?.data?.error || "Scan failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const latestScanId = history?.[0]?.id;

  const riskData = result
    ? [
        { name: "Risk", value: result.risk_score },
        { name: "Safe", value: 100 - result.risk_score },
      ]
    : [
        { name: "Risk", value: 25 },
        { name: "Safe", value: 75 },
      ];

  const portData =
    result?.open_ports?.map((p) => ({
      name: p.service,
      ports: p.port,
    })) || [];

  const trendData = history.slice(0, 8).reverse().map((h, i) => ({
    name: `Scan ${i + 1}`,
    risk: h.risk_score,
  }));

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <button
          className="brand brand-button"
          onClick={() => scrollToSection("top", "Dashboard")}
        >
          <Shield />
          <span>ThreatIntel</span>
        </button>

        <button
          className={activeMenu === "Dashboard" ? "active" : ""}
          onClick={() => scrollToSection("top", "Dashboard")}
        >
          Dashboard
        </button>

        <button
          className={activeMenu === "Scanner" ? "active" : ""}
          onClick={() => scrollToSection(".scan-card", "Scanner")}
        >
          Scanner
        </button>

        <button
          className={activeMenu === "Threats" ? "active" : ""}
          onClick={() => scrollToSection(".chart-grid", "Threats")}
        >
          Threats
        </button>

        <button
          className={activeMenu === "Reports" ? "active" : ""}
          onClick={() => scrollToSection(".history-panel", "Reports")}
        >
          Reports
        </button>

        <button className="logout-btn" onClick={logout}>
          <LogOut size={17} />
          Logout
        </button>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Cybersecurity SaaS Platform</p>
            <h1>Threat Intelligence Dashboard</h1>
            <p>
              Scan targets, analyze open ports, calculate risk, and monitor
              threats.
            </p>
          </div>

          <div className="profile-box">
            <span>Security Analyst</span>
            <strong>Prajwal K</strong>
          </div>
        </header>

        <section className="scan-card">
          <div>
            <h2>Run Target Scan</h2>
            <p>Example: google.com, 8.8.8.8</p>
          </div>

          <form className="scan-form" onSubmit={handleScan}>
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Enter domain or IP address"
            />
            <button disabled={loading}>
              <Search size={18} />
              {loading ? "Scanning..." : "Start Scan"}
            </button>
          </form>

          {error && <div className="error-box">{error}</div>}
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <Activity />
            <span>Risk Score</span>
            <strong>{result ? result.risk_score : 0}/100</strong>
          </div>

          <div className="stat-card">
            <AlertTriangle />
            <span>Risk Level</span>
            <strong>{result ? result.risk_level : "Low"}</strong>
          </div>

          <div className="stat-card">
            <Server />
            <span>Open Ports</span>
            <strong>{result ? result.open_ports.length : 0}</strong>
          </div>
        </section>

        <section className="chart-grid">
          <div className="panel">
            <h3>Risk Distribution</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={riskData}
                  dataKey="value"
                  innerRadius={65}
                  outerRadius={90}
                >
                  <Cell fill="#ef4444" />
                  <Cell fill="#22c55e" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="panel">
            <h3>Risk Trend</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="risk"
                  stroke="#38bdf8"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="panel full">
            <h3>Open Port Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={portData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="ports" fill="#8b5cf6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {result && (
          <section className="result-grid">
            <div className="panel">
              <h3>Scan Summary</h3>
              <p>
                <b>Target:</b> {result.target}
              </p>
              <p>
                <b>Resolved IP:</b> {result.resolved_ip}
              </p>
              <p>
                <b>Risk Level:</b> {result.risk_level}
              </p>

              {latestScanId && (
                <button
                  className="download-btn"
                  onClick={() => downloadReport(latestScanId)}
                >
                  <Download size={16} />
                  Download Security Report
                </button>
              )}
            </div>

            <div className="panel">
              <h3>Open Ports</h3>
              {renderPorts(result.open_ports)}
            </div>

            <div className="panel">
              <h3>Vulnerabilities</h3>
              {result.vulnerabilities?.length > 0 ? (
                result.vulnerabilities.map((v, i) => <p key={i}>• {v}</p>)
              ) : (
                <p>No vulnerability data available.</p>
              )}
            </div>

            <div className="panel">
              <h3>Recommendations</h3>
              {result.recommendations?.length > 0 ? (
                result.recommendations.map((r, i) => <p key={i}>• {r}</p>)
              ) : (
                <p>No recommendation data available.</p>
              )}
            </div>
          </section>
        )}

        <section className="panel history-panel">
          <h3>Scanned History</h3>
          <p className="history-note">
            Click any row to view full scan details.
          </p>

          {history.length === 0 ? (
            <p>No scan history yet.</p>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Target</th>
                    <th>Resolved IP</th>
                    <th>Risk Level</th>
                    <th>Risk Score</th>
                    <th>Open Ports</th>
                    <th>Scan Time</th>
                  </tr>
                </thead>

                <tbody>
                  {history.map((item) => (
                    <tr
                      key={item.id}
                      className="clickable-row"
                      onClick={() => setSelectedScan(item)}
                    >
                      <td>{item.target}</td>
                      <td>{item.resolved_ip}</td>
                      <td>
                        <span
                          className={`risk-badge ${item.risk_level?.toLowerCase()}`}
                        >
                          {item.risk_level}
                        </span>
                      </td>
                      <td>{item.risk_score}/100</td>
                      <td>{item.open_ports?.length || 0}</td>
                      <td>{item.scan_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {selectedScan && (
          <div
            className="history-modal-overlay"
            onClick={() => setSelectedScan(null)}
          >
            <div className="history-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setSelectedScan(null)}
              >
                ×
              </button>

              <h2>Scanned History Details</h2>

              <div className="modal-summary">
                <p>
                  <b>Target:</b> {selectedScan.target}
                </p>
                <p>
                  <b>Resolved IP:</b> {selectedScan.resolved_ip}
                </p>
                <p>
                  <b>Risk Score:</b> {selectedScan.risk_score}/100
                </p>
                <p>
                  <b>Risk Level:</b> {selectedScan.risk_level}
                </p>
                <p>
                  <b>Scan Time:</b> {selectedScan.scan_time}
                </p>

                <button
                  className="download-btn"
                  onClick={() => downloadReport(selectedScan.id)}
                >
                  <Download size={16} />
                  Download PDF Report
                </button>
              </div>

              <h3>Open Ports</h3>
              {renderPorts(selectedScan.open_ports)}

              <h3>Vulnerabilities</h3>
              {selectedScan.vulnerabilities?.length > 0 ? (
                selectedScan.vulnerabilities.map((v, i) => (
                  <p key={i}>• {v}</p>
                ))
              ) : (
                <p>No vulnerability data available.</p>
              )}

              <h3>Recommendations</h3>
              {selectedScan.recommendations?.length > 0 ? (
                selectedScan.recommendations.map((r, i) => (
                  <p key={i}>• {r}</p>
                ))
              ) : (
                <p>No recommendation data available.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}