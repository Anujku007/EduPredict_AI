# EduPredict-AI — Full-Stack MERN + ML Student Performance Platform

![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-REST%20API-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-ML%20Inference-3776AB?style=for-the-badge&logo=python&logoColor=white)

**EduPredict-AI** is a full-stack **MERN (MongoDB, Express.js, React, Node.js)** student academic analytics and performance prediction platform upgraded from a modular Scikit-Learn/CatBoost machine learning pipeline[cite: 53, 55].

---

## Key Features

* **Hybrid ML Inference Bridge:** Invokes the trained Python preprocessing and regression pipeline (`artifacts/model.pkl` & `artifacts/preprocessor.pkl`) via Node child processes, with an automatic calibrated JavaScript fallback for Node-only cloud environments[cite: 55, 72].
* **Interactive Score Diagnostics & Interventions:** Predicts student Math scores from literacy and demographic indicators, classifies students into risk bands (`High Performer`, `On Track`, `Needs Support`), and generates tailored academic recommendations[cite: 74, 81].
* **MongoDB Aggregation Analytics:** Computes real-time cohort KPIs, performance band distributions, and test-preparation course impact directly via MongoDB aggregation pipelines[cite: 70, 79].
* **Role-Based Authentication (JWT):** Separate workflows for **Students** (personal diagnostic tracking) and **Educators** (institution-wide cohort visibility) secured with `bcryptjs` and JWT middleware.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, React Router v6, Tailwind CSS, Lucide Icons, Axios[cite: 60, 66] |
| **Backend** | Node.js, Express.js, JSON Web Tokens (JWT), Bcrypt.js[cite: 64, 71] |
| **Database** | MongoDB Atlas, Mongoose ODM (Aggregation Pipelines & Compound Indexes)[cite: 55, 70, 74] |
| **ML Engine** | Python 3.11, Scikit-Learn, CatBoost, Pandas, Pickle Artifacts[cite: 53, 61] |

---

## Project Structure

```text
EduPredict-AI-MERN/
├── client/                         # React + Vite + Tailwind CSS Frontend
│   └── src/
│       ├── api/axios.js            # Axios instance with JWT interceptor
│       ├── components/             # Navbar, ProtectedRoute
│       ├── context/AuthContext.jsx # Global auth state & token persistence
│       └── pages/                  # Home, Predict, History, Analytics, Login, Register
├── ml_engine/                      # Python ML Inference Bridge
│   ├── artifacts/                  # Trained model.pkl & preprocessor.pkl
│   └── predict_cli.py              # CLI inference wrapper
└── server/                         # Node.js + Express + MongoDB Backend
    ├── config/db.js                # MongoDB Atlas connection
    ├── controllers/                # Auth & Prediction controllers
    ├── middleware/                 # JWT authentication guard
    ├── models/                     # User & Prediction schemas
    ├── routes/                     # REST API endpoints
    ├── services/                   # Node-to-Python inference bridge
    ├── seed.js                     # Database seeder
    └── server.js                   # Express server entry point
```

---

## Local Setup & Installation

### 1. Backend Setup (`server/`)
```bash
cd server
npm install
cp .env.example .env
```

Configure `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/edupredict_mern?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
PYTHON_PATH=python
```

Seed the database and start the API server:
```bash
npm run seed
npm run dev
```

### 2. Frontend Setup (`client/`)
```bash
cd client
npm install
npm run dev
```

---

## Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Educator** | `educator@demo.com` | `Password123!` |
| **Student** | `student@demo.com` | `Password123!` |

---

## REST API Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a Student or Educator account |
| `POST` | `/api/auth/login` | Public | Authenticate user and issue JWT |
| `GET` | `/api/auth/me` | Private | Fetch authenticated user profile |
| `POST` | `/api/predictions` | Private | Run ML inference, generate recommendations & save record |
| `GET` | `/api/predictions` | Private | Fetch user history (or full cohort for Educators) |
| `GET` | `/api/predictions/analytics` | Private | Run MongoDB aggregation for cohort metrics & risk bands |
| `DELETE` | `/api/predictions/:id` | Private | Delete a prediction record |

---

## Author

**Anuj Kumar**
* LinkedIn: [linkedin.com/in/anuj-kumar-836680298](https://linkedin.com/in/anuj-kumar-836680298)
* GitHub: [github.com/Anujku007](https://github.com/Anujku007)
* LeetCode: [leetcode.com/u/Anuj_kumar0007](https://leetcode.com/u/Anuj_kumar0007/)