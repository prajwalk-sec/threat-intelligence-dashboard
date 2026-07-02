import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "threat_data.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute("""
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
        )
    """)
    conn.commit()
    conn.close()