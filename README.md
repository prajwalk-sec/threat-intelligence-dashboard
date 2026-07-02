# 🛡️ Threat Intelligence Dashboard

A full-stack web application built using **React.js** and **Flask (Python)** to monitor, analyze, and visualize cybersecurity threats. The dashboard helps users assess the security of an IP address or domain by performing port scanning, vulnerability analysis, and risk assessment, then presenting the results through an interactive dashboard.

---

## 🚀 Features

- 🔐 User Authentication
- 🌐 IP Address & Domain Analysis
- 🔍 Port Scanning
- 🛡️ Vulnerability Detection
- 📊 Risk Score Calculation
- 💡 Security Recommendations
- 📈 Interactive Dashboard & Charts
- 📱 Responsive User Interface

---

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### Backend
- Flask (Python)
- RESTful APIs

### Database
- SQLite 

### Tools
- Git
- GitHub
- VS Code
- Postman

---

## 🏗️ System Architecture

```
User
   │
   ▼
React.js Dashboard
   │
   ▼
Flask REST API
   │
   ▼
Analysis Engine
 ├── Port Scanner
 ├── Vulnerability Mapper
 ├── Risk Assessment Engine
 └── Recommendation Generator
   │
   ▼
Database
   │
   ▼
Dashboard Results
```

---

## ⚙️ Workflow

1. User logs in to the dashboard.
2. User enters an IP address or domain name.
3. React.js sends the request to the Flask backend.
4. The backend performs:
   - Port Scanning
   - Vulnerability Detection
   - Risk Score Calculation
   - Security Recommendation Generation
5. Results are stored (if configured).
6. The dashboard displays security insights, charts, and recommendations.

---

## 📂 Project Structure

```
threat-intelligence-dashboard/
│── frontend/
│── backend/
│── README.md
└── .gitignore
```

---

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/prajwalk-sec/threat-intelligence-dashboard.git
```

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

## 📸 Screenshots

Add screenshots of:
- Login Page
<img width="1537" height="712" alt="Login Page" src="https://github.com/user-attachments/assets/2f1d292d-68fc-4c12-ba15-5739616306f6" />




- Dashboard
<img width="1877" height="660" alt="Dashboard" src="https://github.com/user-attachments/assets/e439f283-ca0f-4697-a6ec-759c5eb3a855" />




- Threat Analysis
<img width="1582" height="851" alt="Threat Analysis" src="https://github.com/user-attachments/assets/13cd1649-9562-4898-8d3d-564e686b7fe0" />




- Risk Score
<img width="1576" height="881" alt="Risk Score" src="https://github.com/user-attachments/assets/a927abc0-8012-4704-8fbe-3cea7fe1a5c8" />




- Scan Results
<img width="1552" height="551" alt="Scan Results" src="https://github.com/user-attachments/assets/16ca6981-a3e1-4825-a3fd-6b791f694fbf" />


---

## 🔮 Future Enhancements

- AI-powered Threat Detection
- Real-time Threat Intelligence Feeds
- PDF Report Generation
- Advanced Analytics
- View previously scanned history
- Download scan reports as PDF
- Search and filter past scan results
- Monitor threat severity and recommendations
 

---

## 👨‍💻 Author

**Prajwal K**

GitHub: https://github.com/prajwalk-sec
