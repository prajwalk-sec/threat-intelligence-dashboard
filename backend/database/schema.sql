CREATE TABLE IF NOT EXISTS scans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    target TEXT NOT NULL,
    resolved_ip TEXT,
    open_ports TEXT,
    vulnerabilities TEXT,
    risk_score INTEGER,
    risk_level TEXT,
    recommendations TEXT,
    scan_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);