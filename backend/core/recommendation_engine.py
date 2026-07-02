def generate_recommendations(open_ports, risk_level):
    recommendations = []

    if not open_ports:
        return ["No common exposed ports detected. Continue regular monitoring."]

    for item in open_ports:
        port = item.get("port")

        if port == 21:
            recommendations.append("Disable FTP or replace it with SFTP.")
        elif port == 22:
            recommendations.append("Use SSH key-based login and disable root login.")
        elif port == 23:
            recommendations.append("Disable Telnet immediately.")
        elif port == 80:
            recommendations.append("Redirect HTTP traffic to HTTPS.")
        elif port == 445:
            recommendations.append("Block SMB access from public networks.")
        elif port == 3306:
            recommendations.append("Restrict MySQL access to trusted IP addresses only.")
        elif port == 3389:
            recommendations.append("Protect RDP with VPN, MFA, and firewall rules.")

    if risk_level in ["High", "Critical"]:
        recommendations.append("Immediate security review is recommended.")

    return recommendations