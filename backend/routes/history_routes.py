from flask import Blueprint, jsonify
import json
from database.db import get_db_connection

history_bp = Blueprint("history_bp", __name__)

@history_bp.route("/history", methods=["GET"])
def history():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM scans ORDER BY id DESC").fetchall()
    conn.close()

    data = []

    for row in rows:
        data.append({
            "id": row["id"],
            "target": row["target"],
            "resolved_ip": row["resolved_ip"],
            "open_ports": json.loads(row["open_ports"]),
            "vulnerabilities": json.loads(row["vulnerabilities"]),
            "risk_score": row["risk_score"],
            "risk_level": row["risk_level"],
            "recommendations": json.loads(row["recommendations"]),
            "scan_time": row["scan_time"]
        })

    return jsonify(data)