from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os
import json

def generate_pdf_report(scan):
    report_path = os.path.join(os.path.dirname(__file__), f"scan_report_{scan['id']}.pdf")

    open_ports = json.loads(scan["open_ports"])
    vulnerabilities = json.loads(scan["vulnerabilities"])
    recommendations = json.loads(scan["recommendations"])

    c = canvas.Canvas(report_path, pagesize=letter)
    width, height = letter
    y = height - 50

    c.setFont("Helvetica-Bold", 18)
    c.drawString(50, y, "Threat Intelligence Security Report")

    y -= 45
    c.setFont("Helvetica", 11)
    c.drawString(50, y, f"Target: {scan['target']}")
    y -= 22
    c.drawString(50, y, f"Resolved IP: {scan['resolved_ip']}")
    y -= 22
    c.drawString(50, y, f"Risk Score: {scan['risk_score']}/100")
    y -= 22
    c.drawString(50, y, f"Risk Level: {scan['risk_level']}")
    y -= 22
    c.drawString(50, y, f"Scan Time: {scan['scan_time']}")

    y -= 35
    c.setFont("Helvetica-Bold", 13)
    c.drawString(50, y, "Open Ports")
    c.setFont("Helvetica", 10)

    y -= 20
    if open_ports:
        for p in open_ports:
            c.drawString(60, y, f"- Port {p['port']} : {p['service']}")
            y -= 18
    else:
        c.drawString(60, y, "No common open ports detected.")
        y -= 18

    y -= 20
    c.setFont("Helvetica-Bold", 13)
    c.drawString(50, y, "Vulnerabilities")
    c.setFont("Helvetica", 10)

    y -= 20
    for v in vulnerabilities:
        c.drawString(60, y, f"- {v[:90]}")
        y -= 18

    y -= 20
    c.setFont("Helvetica-Bold", 13)
    c.drawString(50, y, "Recommendations")
    c.setFont("Helvetica", 10)

    y -= 20
    for r in recommendations:
        c.drawString(60, y, f"- {r[:90]}")
        y -= 18

    c.save()
    return report_path