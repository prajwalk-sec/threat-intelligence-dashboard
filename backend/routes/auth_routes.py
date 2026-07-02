from flask import Blueprint, request, jsonify

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if email == "admin@gmail.com" and password == "admin123":
        return jsonify({
            "message": "Login successful",
            "token": "demo-token",
            "user": {
                "name": "Prajwal K",
                "email": email,
                "role": "Security Analyst"
            }
        })

    return jsonify({"error": "Invalid email or password"}), 401