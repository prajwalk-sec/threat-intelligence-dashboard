def calculate_risk(open_ports):
    risk_weights = {
        21: 15,
        22: 10,
        23: 30,
        25: 10,
        80: 8,
        445: 30,
        3306: 25,
        3389: 35
    }

    score = 0

    for item in open_ports:
        port = item.get("port")
        score += risk_weights.get(port, 5)

    score = min(score, 100)

    if score >= 75:
        level = "Critical"
    elif score >= 50:
        level = "High"
    elif score >= 20:
        level = "Medium"
    else:
        level = "Low"

    return score, level