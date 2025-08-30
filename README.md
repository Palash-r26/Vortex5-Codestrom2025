
# 🏥 Vortex 5 - AI Diagnostic & Prescription Assistant

**CodeStorm Hackathon 2025 – Problem Statement 1**

> An intelligent healthcare assistant that provides AI-powered symptom analysis, disease prediction, and medication recommendations with multilingual support and explainable AI.

---

## 🎯 Project Overview

**Vortex 5** is a full-stack AI medical assistant that helps patients and doctors by:

* 🧾 **Analyzing symptoms** using NLP
* 🧠 **Predicting diseases** with confidence scores & reasoning
* 💊 **Recommending safe medications** with dosages & side effects
* 🌍 **Supporting multiple languages** (English, Hindi, Spanish, French, German, Portuguese)
* 🔒 **Ensuring safety & privacy** with HIPAA-compliant handling

---

## ✨ Key Features

* **🤖 AI-Powered Diagnosis**

  * Symptom analysis & disease prediction
  * Confidence scoring + explainable reasoning
  * Risk assessment for critical symptoms

* **💊 Smart Medication Management**

  * First-line recommendations
  * Dosage & side effect checks
  * Pill reminders & scheduling

* **🌍 Multilingual Support**

  * Automatic language detection
  * Patient-friendly translations
  * Region-specific advice

* **📊 Dashboards**

  * Patient portal & history
  * Doctor interface for flagged cases
  * Analytics & health trends

* **🔒 Safety & Compliance**

  * Emergency detection & alerts
  * Provider referrals
  * End-to-end encryption & audit logging

---

## 🏗️ System Architecture

```
React Frontend  <──>  Flask Backend  <──>  PostgreSQL DB
     │                        │
 Chatbot UI            ML Diagnosis Engine
 Multi-language        Risk Assessment
 Voice Input           Medical Knowledge DB
```

---

## 🚀 Quick Start

### Backend Setup

```bash
# Clone repo
git clone https://github.com/your-team/Vortex5_CodeStorm2025.git
cd Vortex5_CodeStorm2025

# Python env
python -m venv venv
source venv/bin/activate   # (Windows: venv\Scripts\activate)

# Install deps
pip install -r requirements.txt

# Setup DB
createdb vortex5_medical_ai
psql -d vortex5_medical_ai -f database_setup.sql

# Run backend
python app.py
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend → `http://localhost:3000`
Backend API → `http://localhost:5000`

---

## 📚 API Endpoints

* **User Auth**

  * `POST /api/auth/register` → Register new user
  * `POST /api/auth/login` → Login

* **Core**

  * `POST /api/predict` → Symptom analysis & diagnosis
  * `POST /api/translate` → Translate medical terms
  * `GET /api/dashboard` → Patient dashboard
  * `GET /api/history` → Medical history

* **Reminders**

  * `GET /api/reminders` / `POST /api/reminders`

---

## 🧪 Testing

```bash
# Backend
pytest

# Frontend
npm test
```

---

## ⚠️ Disclaimer

This application is for **educational & informational purposes only**.
It is **not a substitute for professional medical advice**. Always consult a qualified healthcare provider.

---

## 👥 Team Vortex 5
Member - 1 Palash Rai 

Member - 2 Prarthana Sharma 

Member - 3 Sarvesh Baghel 

Member - 4 Yashasav Khandelwal  

Member - 5 Adarsh Goyal  

## 🏆 Hackathon Deliverables

✅ Full-stack codebase
✅ Working demo with AI engine
✅ Multilingual support
✅ Documentation & pitch deck
✅ Security & compliance features

---

### 💡 Built with ❤️ for CodeStorm Hackathon 2025

**Empowering healthcare through AI innovation** 🌍

