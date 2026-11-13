# EduPredict-AI — Full-Stack MERN + ML Student Performance Platform

![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-REST%20API-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-ML%20Inference-3776AB?style=for-the-badge&logo=python&logoColor=white)

**EduPredict-AI** is a full-stack **MERN (MongoDB, Express.js, React, Node.js)** student academic analytics and performance prediction platform upgraded from the original modular Python/Flask ML pipeline.

## Architecture Overview
- **Frontend (`client/` — React 18, Vite, Tailwind CSS):** Interactive student score prediction form, real-time score breakdown, personalized study recommendations, prediction history table, and cohort analytics dashboard.
- **Backend (`server/` — Node.js, Express, MongoDB/Mongoose):** JWT authentication (`Educator` / `Student` roles), prediction persistence, cohort analytics aggregation, and a bridge service that invokes your trained Python `PredictPipeline` (`artifacts/model.pkl` + `artifacts/preprocessor.pkl`) with an automatic JS fallback model when Python isn't present in serverless environments.
- **ML Engine (`ml_engine/`):** Drop your existing `src/` and `artifacts/` folders (`model.pkl`, `preprocessor.pkl`) directly into `ml_engine/` for live Scikit-learn / CatBoost inference.

## Quick Start

### 1. Backend Setup (`server/`)
```bash
cd server
npm install
cp .env.example .env
# Add your MongoDB Atlas URI and JWT_SECRET in .env
npm run seed
npm run dev
```

### 2. Frontend Setup (`client/`)
```bash
cd client
npm install
npm run dev
```

## Demo Credentials (after `npm run seed`)
- **Educator / Admin:** `educator@demo.com` / `Password123!`
- **Student:** `student@demo.com` / `Password123!`
