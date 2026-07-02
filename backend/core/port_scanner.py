import socket

COMMON_PORTS = {
    21: "FTP",
    22: "SSH",
    23: "Telnet",
    25: "SMTP",
    53: "DNS",
    80: "HTTP",
    110: "POP3",
    143: "IMAP",
    443: "HTTPS",
    445: "SMB",
    3306: "MySQL",
    3389: "RDP"
}

PORT_RISK_INFO = {
    21: {"level": "High", "label": "Weak file transfer risk"},
    22: {"level": "Medium", "label": "Brute-force login risk"},
    23: {"level": "Critical", "label": "Unencrypted Telnet access"},
    25: {"level": "Medium", "label": "Email abuse or spam relay risk"},
    53: {"level": "Medium", "label": "DNS amplification attack risk"},
    80: {"level": "High", "label": "Unencrypted HTTP traffic"},
    110: {"level": "Medium", "label": "Unencrypted email retrieval risk"},
    143: {"level": "Medium", "label": "IMAP mail exposure risk"},
    443: {"level": "Low", "label": "HTTPS exposed; verify SSL/TLS configuration"},
    445: {"level": "Critical", "label": "SMB ransomware and lateral movement risk"},
    3306: {"level": "High", "label": "Public database exposure risk"},
    3389: {"level": "Critical", "label": "RDP brute-force and remote access risk"},
}

def scan_ports(ip):
    open_ports = []

    for port, service in COMMON_PORTS.items():
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(0.8)
            result = sock.connect_ex((ip, port))

            if result == 0:
                risk = PORT_RISK_INFO.get(port, {
                    "level": "Low",
                    "label": "Service exposure should be reviewed"
                })

                open_ports.append({
                    "port": port,
                    "service": service,
                    "status": "open",
                    "port_risk_level": risk["level"],
                    "port_risk_label": risk["label"]
                })

            sock.close()
        except Exception:
            pass

    return open_ports