# 🏥 Doctor Appointment Booking System

A full-stack web application for managing doctor appointments. The platform allows **patients** to register, book appointments, and manage their profile, while **doctors** can manage their schedules and view bookings. Admins have access to system-wide dashboards.

---

## 🚀 Features

* 👤 **User (Patient)**

  * Register & login with JWT authentication
  * Profile management
  * Book and view appointments

* 🩺 **Doctor**

  * Register & login with JWT authentication
  * View and manage appointments
  * Profile management

* 🔐 **Authentication**

  * Login with **Access Token (short-lived)**
  * **Refresh Token (long-lived)** with auto token renewal
  * Role-based protected routes (User, Doctor, Admin)

* 📅 **Appointments**

  * Patients can book appointments with available doctors
  * Doctors can approve/reject/manage appointments

* 📊 **Admin**

  * Manage users and doctors
  * Dashboard view for system overview

---

## 🛠️ Tech Stack

**Frontend:**

* React (Vite)
* React Router
* Context API for Auth State
* Axios with Interceptors
* Tailwind CSS

**Backend:**

* Node.js / Express.js
* MongoDB (Mongoose ODM)
* JWT Authentication (Access + Refresh tokens)
* bcrypt for password hashing
* Cookie-based token storage (httpOnly cookies)

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/doctor-appointment-system.git
cd doctor-appointment-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/doctorApp
ACCESS_TOKEN_SECRET=yourAccessTokenSecret
REFRESH_TOKEN_SECRET=yourRefreshTokenSecret
ACCESS_TOKEN_EXPIRE=1h
REFRESH_TOKEN_EXPIRE=5d
NODE_ENV=development
```

Run backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in `/frontend`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

---

## 🔐 Authentication Flow

1. User/Doctor logs in → Server generates **Access Token** & **Refresh Token**.

   * Both tokens stored in **httpOnly cookies**.
2. Access Token is used for API requests (expires in \~1 hour).
3. If Access Token expires → Axios interceptor calls `/refresh-token` using Refresh Token.
4. New Access Token is issued without forcing user to log in again.
5. Logout clears both tokens.

---

## 📡 API Endpoints

### Auth Routes

* `POST /api/user/register` → Register new user
* `POST /api/user/login` → Login user
* `POST /api/user/logout` → Logout (clear cookies)
* `POST /api/user/refresh-token` → Refresh access token
* `GET /api/user/get-profile` → Get logged-in user profile

### Doctor Routes

* `POST /api/doctor/register` → Register new doctor
* `POST /api/doctor/login` → Login doctor
* `GET /api/doctor/get-profile` → Get doctor profile
* `GET /api/doctor/appointments` → Fetch doctor’s appointments

### Appointment Routes

* `POST /api/appointments` → Book new appointment
* `GET /api/appointments` → List all appointments (admin only)

---

## 🧑‍💻 Project Structure

```
doctor-appointment-system/
│
├── backend/
│   ├── models/           # Mongoose schemas (User, Doctor, Appointment)
│   ├── routes/           # Express routes
│   ├── controllers/      # Route controllers
│   ├── middlewares/      # Auth & error handling
│   ├── utils/            # JWT helpers
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── context/      # Auth context
│   │   ├── pages/        # Routes (Login, Register, Dashboard, etc.)
│   │   ├── utils/        # Axios instance
│   │   └── App.jsx
│
└── README.md
```

---

## ✅ Best Practices Implemented

* JWT with refresh mechanism
* Password hashing with bcrypt
* Secure cookies (`httpOnly`, `sameSite`, `secure`)
* Role-based route protection (User, Doctor, Admin)
* Centralized Axios interceptor for token management

---

## 🚧 To-Do / Improvements

* Add appointment availability calendar
* Email/SMS notifications for appointments
* Two-factor authentication
* Admin analytics dashboard

