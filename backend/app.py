from flask import Flask
from flask_cors import CORS

from routes.scan_routes import scan_bp
from routes.history_routes import history_bp
from routes.auth_routes import auth_bp
from routes.report_routes import report_bp
from database.db import init_db

# ✅ Create app FIRST
app = Flask(__name__)

# ✅ Enable CORS
CORS(app)

# ✅ Initialize DB
init_db()

# ✅ Register routes
app.register_blueprint(scan_bp, url_prefix="/api")
app.register_blueprint(history_bp, url_prefix="/api")
app.register_blueprint(auth_bp, url_prefix="/api")
app.register_blueprint(report_bp, url_prefix="/api")

# ✅ Home route
@app.route("/")
def home():
    return {"message": "Threat Intelligence Backend Running"}

# ✅ Run app (ONLY ONCE)
if __name__ == "__main__":
    app.run(debug=True, port=5000)