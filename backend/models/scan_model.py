class Scan:
    def __init__(self, target, resolved_ip, risk_score, risk_level):
        self.target = target
        self.resolved_ip = resolved_ip
        self.risk_score = risk_score
        self.risk_level = risk_level