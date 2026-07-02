import { useState } from "react";
import { ShieldCheck, Lock, Mail } from "lucide-react";
import { loginUser } from "../services/api";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(email, password);
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
    } catch {
      setError("Invalid login. Use admin@gmail.com / admin123");
    }
  };

  return (
    <div className="login-page">
      <div className="cyber-grid"></div>

      <form className="login-card" onSubmit={handleLogin}>
        <div className="login-icon">
          <ShieldCheck size={44} />
        </div>

        <h1>ThreatIntel</h1>
        <p>AI-powered vulnerability monitoring dashboard</p>

        <div className="input-box">
          <Mail size={18} />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div className="input-box">
          <Lock size={18} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        {error && <span className="login-error">{error}</span>}

        <button>Launch Dashboard</button>

        <small>Demo Login: admin@gmail.com / admin123</small>
      </form>
    </div>
  );
}