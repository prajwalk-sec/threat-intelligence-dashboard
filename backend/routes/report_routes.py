from flask import Blueprint, jsonify, send_file
from database.db import get_db_connection
from reports.pdf_generator import generate_pdf_report

report_bp = Blueprint("report_bp", __name__)

@report_bp.route("/report", methods=["GET"])
def report_status():
    return jsonify({"message": "Report module ready"})

@report_bp.route("/report/download/<int:scan_id>", methods=["GET"])
def download_report(scan_id):
    conn = get_db_connection()
    scan = conn.execute("SELECT * FROM scans WHERE id = ?", (scan_id,)).fetchone()
    conn.close()

    if not scan:
        return jsonify({"error": "Scan report not found"}), 404

    file_path = generate_pdf_report(scan)
    return send_file(file_path, as_attachment=True)