from flask import Blueprint, request, jsonify
import json

from core.utils import resolve_target, clean_target
from core.port_scanner import scan_ports
from core.risk_engine import calculate_risk
from core.vulnerability_mapper import map_vulnerabilities
from core.recommendation_engine import generate_recommendations
from core.whois_lookup import get_whois_info
from database.db import get_db_connection

scan_bp = Blueprint("scan_bp", __name__)

@scan_bp.route("/scan", methods=["POST"])
def scan():
    data = request.get_json()
    target = data.get("target", "").strip()

    if not target:
        return jsonify({"error": "Target is required"}), 400

    cleaned_target = clean_target(target)
    resolved_ip = resolve_target(cleaned_target)

    if not resolved_ip:
        return jsonify({"error": "Invalid target or domain not found"}), 400

    open_ports = scan_ports(resolved_ip)
    vulnerabilities = map_vulnerabilities(open_ports)
    risk_score, risk_level = calculate_risk(open_ports)
    recommendations = generate_recommendations(open_ports, risk_level)
    whois_info = get_whois_info(cleaned_target)

    conn = get_db_connection()
    conn.execute("""
        INSERT INTO scans
        (target, resolved_ip, open_ports, vulnerabilities, risk_score, risk_level, recommendations)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        cleaned_target,
        resolved_ip,
        json.dumps(open_ports),
        json.dumps(vulnerabilities),
        risk_score,
        risk_level,
        json.dumps(recommendations)
    ))
    conn.commit()
    conn.close()

    return jsonify({
        "target": cleaned_target,
        "resolved_ip": resolved_ip,
        "open_ports": open_ports,
        "vulnerabilities": vulnerabilities,
        "risk_score": risk_score,
        "risk_level": risk_level,
        "recommendations": recommendations,
        "whois_info": whois_info
    })