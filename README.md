# GJBMS
Gold and Jewelry Business Management System

 Gold and Jewelry Business Management System
A modern web application to manage gold and jewelry shop operations, built with FastAPI, SQLite, and a responsive HTML/CSS frontend.

🚀 Features
✅ Login and registration system
✅ User roles: admin & regular user
✅ Admin and user dashboards
✅ Token & session-based authentication
✅ Password hashing & basic security
✅ Responsive and elegant black & gold design

🛠 Tech Stack
Backend: Python, FastAPI, Uvicorn, passlib, python-jose

Frontend: HTML, CSS (black & gold theme), JavaScript

Database: SQLite

👥 Team Roles
Member	Responsibility
Frontend Developer	UI/UX design, templates, CSS & JS
Backend Developer	FastAPI routes, authentication, token handling
Database Engineer	Database schema, CRUD operations, integration

📂 Project Structure
pgsql
Copy
Edit
fastapi_goldshop/
├── app/
│   ├── main.py
│   ├── routes/
│   │   └── auth.py
│   ├── models/
│   │   └── db.py, schemas.py
│   └── utils/
│       └── security.py, token.py
├── templates/
│   ├── login.html, register.html, admin_dashboard.html, user_dashboard.html
├── static/
│   ├── css/style.css
│   └── js/script.js
├── database/
│   ├── init_db.py, users.db
├── README.md
└── requirements.txt
⚙ How to Run
bash
Copy
Edit
pip install -r requirements.txt
python database/init_db.py
uvicorn app.main:app --reload
Open http://127.0.0.1:8000

📌 Initial Credentials
Username: admin

Password: admin123

📅 Timeline
✅ Week 1: Design & development
✅ Week 2: Security & testing
✅ Week 3: Deployment & documentation

🤝 Contributing
Each member works on a separate branch (frontend, backend, database)

Use clear commit messages: feat:, fix:, docs: etc.

Create Pull Requests for merging into main

✨ Built by a dedicated team to modernize gold & jewelry shop management.
