# 🤖 AI Interview Platform

An AI-powered full stack web application that helps students practice technical interviews by analyzing resumes, generating AI questions, evaluating answers, and tracking performance.

---

## 🚀 Live Demo

🔗 Frontend: https://ai-interview-frontend-ka0.onrender.com
🔗 Backend API: https://ai-interview-platform-5tom.onrender.com

---

## ✨ Features

* 🔐 User Authentication (Signup / Login with JWT)
* 📄 Resume Upload & AI Resume Analysis
* 🤖 AI-Generated Technical Interview Questions
* 🧠 AI Answer Evaluation with Score & Feedback
* 📊 Dashboard Analytics (Average Score, Best Score, Progress Chart)
* 🕒 Interview History Tracking
* 📱 Responsive Modern UI

---

## 🛠️ Tech Stack

### Frontend

* HTML
* Tailwind CSS
* JavaScript
* Chart.js

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer (File Upload)

### AI Integration

* Groq API (Llama-3 Model)

---

## 🧩 Project Architecture

```
Frontend → API Requests → Express Server → MongoDB Database
                              ↓
                          Groq AI API
```

---

## ⚙️ Installation (Local Setup)

### 1️⃣ Clone Repo

```
git clone https://github.com/YoganandaSravan08/AI-INTERVIEW-PLATFORM.git
cd AI-INTERVIEW-PLATFORM
```

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env`

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
GROQ_API_KEY=your_groq_key
```

Run server

```
npm start
```

### 3️⃣ Frontend

Open `frontend/index.html` in browser

---

## 📊 Future Improvements

* Voice-based Interview
* Video Interview Simulation
* Coding Round Integration
* Resume Score Prediction
* Admin Panel

---

## 👨‍💻 Author

**Yogananda Sravan Angani**

* GitHub: https://github.com/YoganandaSravan08

---

⭐ If you like this project, give it a star!
