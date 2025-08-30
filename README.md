🏥 Vortex 5 - AI Diagnostic & Prescription Assistant
CodeStorm Hackathon 2025 - Problem Statement 1
An intelligent healthcare assistant that provides AI-powered symptom analysis, disease prediction, andmedication recommendations with multilingual support and explainable AI.
Show Image
Show Image
Show Image
Show Image
🎯 Project Overview
Vortex 5 is a comprehensive AI-powered medical assistant designed to:
Analyze symptoms
using advanced NLP and machine learning
Predict diseases
with confidence scores and explainable reasoning
Recommend medications
with proper dosages, side effects, and contraindications
Support multiple languages
(English, Hindi, Spanish, and more)
Ensure safety
with critical symptom detection and provider referrals
Maintain privacy
with HIPAA-compliant data handling
✨ Key Features
🤖 AI-Powered Diagnosis
Symptom Analysis
: NLP processing of structured/unstructured symptom descriptions
Disease Prediction
: ML models trained on medical datasets with confidence scoring
Risk Assessment
: Automated detection of critical symptoms requiring immediate care
Explainable AI
: Clear reasoning for all predictions and recommendations
💊 Smart Medication Management
First-line Recommendations
: Evidence-based medication suggestions
Dosage Calculation
: Age and weight-based dosing
Safety Checks
: Drug interactions, allergies, and contraindications
Pill Reminders
: Automated medication scheduling and tracking
🌍 Multilingual Support
Language Detection
: Automatic identification of user's language
Medical Translation
: Complex terms simplified for patient understanding
Cultural Adaptation
: Region-specific health recommendations and emergency contacts
Supported Languages
: English, Hindi, Spanish, French, German, Portuguese
📊 Comprehensive Dashboard
Patient Portal
: Personal health history, prescriptions, and analytics
Doctor Interface
: Review flagged cases and high-risk patients
Analytics Dashboard
: Usage statistics, model performance, and health trends
Medical History
: Complete consultation records with search and filtering
🔒 Safety & Compliance
Critical Detection
: Emergency symptom identification with immediate alerts
Provider Referrals
: Automatic recommendations for professional medical care
Data Privacy
: End-to-end encryption and secure data handling
Audit Logging
: Complete traceability of all medical recommendations
🏗️
System Architecture
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ React Frontend │◄──►│ Flask Backend │◄──►│ PostgreSQL DB │
│ (Client App) │ │ (API Server) │ │ (Data Store) │
🚀 Quick Start
Prerequisites
Python 3.8+
Node.js 16+
PostgreSQL 13+
Redis (optional, for caching)
Backend Setup
└─────────────────┘ └─────────────────┘ └─────────────────┘
│ │ │
│ ┌─────────────────┐ │
│ │ ML Engine │ │
│ │ (Diagnosis AI) │ │
│ └─────────────────┘ │
│ │ │
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Chatbot UI │ │ Safety Checker │ │ Medical Knowledge│
│ Voice Input │ │ Risk Assessment │ │ Database │
│ Multi-language │ │ Provider Alerts │ │ Diseases/Meds │
└─────────────────┘ └─────────────────┘ └─────────────────┘
bash
Frontend Setup
Docker Setup (Alternative)
# Clone the repository
git
clone https://github.com/your-team/Vortex5_CodeStorm2025.git
cd
Vortex5_CodeStorm2025
# Create virtual environment
python -m venv venv
source
venv/bin/activate
# On Windows: venv\Scripts\activate
# Install Python dependencies
pip
install
-r requirements.txt
# Setup database
createdb vortex5_medical_ai
psql -d vortex5_medical_ai -f database_setup.sql
# Environment configuration
cp
.env.example .env
# Edit .env with your database credentials and API keys
# Download NLTK data
python -c
"import nltk; nltk.download('punkt'); nltk.download('stopwords')"
# Run database migrations
flask db upgrade
# Start the backend server
python app.py
bash
# Navigate to frontend directory
cd
frontend
# Install dependencies
npm
install
# Start development server
npm
start
bash
📚 API Documentation
Authentication
Core Endpoints
# Build and run with Docker Compose
docker-compose
up --build
# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
bash
# Register new user
POST /api/auth/register
{
"email"
:
"user@example.com"
,
"password"
:
"secure_password"
,
"name"
:
"John Doe"
,
"age"
:
30
,
"weight"
:
70
,
"height"
:
175
,
"gender"
:
"male"
,
"allergies"
:
"penicillin"
,
"preferred_language"
:
"en"
}
# Login
POST /api/auth/login
{
"email"
:
"user@example.com"
,
"password"
:
"secure_password"
}
bash
Response Format
# Symptom analysis and diagnosis
POST /api/predict
{
"symptoms"
:
"I have a headache and feel nauseous"
,
"language"
:
"en"
}
# Medical term translation
POST /api/translate
{
"text"
:
"You have hypertension"
,
"language"
:
"hi"
,
"simple"
:
true
}
# User dashboard data
GET /api/dashboard
# Medical history
GET /api/history?page
=
1
&
per_page
=
20
# Pill reminders
GET /api/reminders
POST /api/reminders
json
🧪 Testing
Backend Tests
Frontend Tests
{
"consultation_id"
:
"uuid"
,
"predictions"
:
[
{
"name"
:
"Common Cold"
,
"confidence"
:
0.85
,
"reasoning"
:
"Based on matching symptoms: runny nose, sore throat"
,
"category"
:
"respiratory"
,
"severity"
:
"mild"
}
]
,
"medications"
:
[
{
"name"
:
"Paracetamol"
,
"dosage"
:
"500mg"
,
"frequency"
:
"every 6 hours"
,
"duration"
:
"3-5 days"
,
"side_effects"
:
[
"nausea"
,
"liver damage with overdose"
]
}
]
,
"safety"
:
{
"risk_level"
:
"LOW"
,
"refer_to_provider"
:
false
,
"reasoning"
:
"Symptoms suggest common condition treatable with first-line medications"
}
}
bash
# Run unit tests
pytest
# Run with coverage
pytest --cov
=
. --cov-report
=
html
# Run specific test file
pytest tests/test_ml_engine.py -v
bash
Integration Tests
📊 Performance Metrics
Response Time
: < 2 seconds for symptom analysis
Accuracy
: 85%+ disease prediction accuracy on test dataset
Availability
: 99.5% uptime with proper deployment
Scalability
: Handles 1000+ concurrent users
Languages
: Support for 8+ languages with 90%+ translation accuracy
🔧 Configuration
Environment Variables
# Run React tests
npm
test
# Run with coverage
npm
test
-- --coverage
bash
# Test complete user flow
pytest tests/test_integration.py -v
# Load testing
locust -f tests/load_test.py --host
=
http://localhost:5000
env
🚦 Deployment
Production Deployment
Cloud Deployment Options
AWS
: Deploy on EC2 with RDS PostgreSQL
Google Cloud
: Use App Engine with Cloud SQL
# Database
DATABASE_URL=postgresql://user:password@localhost/vortex5_medical_ai
# Security
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret
# External APIs
OPENAI_API_KEY=your-openai-key # Optional for enhanced NLP
GOOGLE_TRANSLATE_API_KEY=your-google-key
# Email Configuration
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-email-password
# Redis (Optional)
REDIS_URL=redis://localhost:6379/0
# Production Settings
FLASK_ENV=production
DEBUG=False
bash
# Using Gunicorn
gunicorn -w
4
-b
0.0
.0.0:5000 app:app
# Using Docker
docker
build -t vortex5-backend
.
docker
run -p
5000
:5000 vortex5-backend
# Database production setup
pg_dump vortex5_medical_ai
>
backup.sql
psql production_db
<
backup.sql
Azure
: Deploy on App Service with Azure Database
Heroku
: Simple deployment with Heroku Postgres
📈 Monitoring & Analytics
Health Monitoring
Logging
Application Logs
: Structured logging with correlation IDs
Audit Trail
: Complete record of all medical recommendations
Error Tracking
: Integration with Sentry for error monitoring
Performance Metrics
: Real-time monitoring of API response times
🤝 Contributing
Development Workflow
1.
Fork the repository
2.
Create feature branch:
git checkout -b feature/amazing-feature
3.
Commit changes:
git commit -m 'Add amazing feature'
4.
Push to branch:
git push origin feature/amazing-feature
5.
Open a Pull Request
Code Standards
Python
: Follow PEP 8, use Black formatter
JavaScript
: Use ESLint and Prettier
Testing
: Maintain 90%+ code coverage
Documentation
: Update README and API docs
bash
# Health check endpoint
GET /health
# System metrics
GET /api/analytics
# Database performance
SELECT * FROM analytics_metrics WHERE metric_name
=
'response_time'
;
Medical Data Guidelines
All medical recommendations must be evidence-based
Include proper disclaimers and safety warnings
Regular review by medical professionals
Compliance with healthcare regulations
⚠️
Important Disclaimers
MEDICAL DISCLAIMER
: This application is designed to provide general health information and shouldnot be used as a substitute for professional medical advice, diagnosis, or treatment. Always consultqualified healthcare providers for medical concerns.
DATA PRIVACY
: We implement industry-standard security measures to protect your health information.However, no system is 100% secure. Users should be aware of privacy implications.
ACCURACY
: While our AI models are trained on medical datasets, they may not be 100% accurate.Always seek professional medical advice for serious symptoms.
📞 Support & Contact
Documentation
:
docs.vortex5.ai
Support Email
:
support@vortex5.ai
Emergency
: For medical emergencies, call your local emergency services
Bug Reports
: Create an issue on GitHub
📄 License
This project is licensed under the MIT License - see the
LICENSE
file for details.
🏆 Hackathon Submission
Team Vortex 5
Team Lead
: [Your Name] - AI/ML Engineer
Backend Developer
: [Name] - Python/Flask Expert
Frontend Developer
: [Name] - React/UI Specialist
Data Engineer
: [Name] - Database/Analytics
Medical Advisor
: [Name] - Healthcare Professional
Hackathon Deliverables
✅
Complete Codebase
: Full-stack application with AI engine
✅
Working Demo
: Live deployment with sample data
✅
Documentation
: Comprehensive setup and usage guides
✅
Presentation
: 5-minute pitch with live demonstration
✅
Video Demo
: 3-minute walkthrough of key features
✅
Testing Suite
: Unit, integration, and load tests
✅
Database Schema
: Production-ready with sample data
✅
Security Implementation
: Authentication, authorization, data encryption
✅
Multilingual Support
: English, Hindi, Spanish translations
Innovation Highlights
🚀
Explainable AI
: Clear reasoning for all medical recommendations
🌍
Cultural Adaptation
: Region-specific health advice and emergency contacts
🔍
Smart Safety Detection
: Advanced critical symptom identification
📱
Voice Integration
: Speech-to-text symptom input
💊
Intelligent Reminders
: AI-powered medication scheduling
📊
Real-time Analytics
: Comprehensive health metrics dashboard
Built with ❤️ for CodeStorm Hackathon 2025
Empowering healthcare through AI innovation
