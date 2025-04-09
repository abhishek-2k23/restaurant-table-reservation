# 🍽️ Restaurant Table Booking Backend

A secure and scalable RESTful API backend built with **Node.js**, **Express.js**, and **MongoDB** that enables users to register, browse restaurants, book tables, view reservations, and receive email notifications.

---
### Deployed on Render

- live url : https://reserve-table-l13s.onrender.com/api/
---

## 🚀 Features

- 🔐 **JWT Authentication** 
- 📧 **Email Notifications** using Nodemailer (Gmail service)
- 🧾 **Input Validation** using `express-validator`
- 📅 **Reservation Management** with real-time availability check
- 🍴 **Restaurant Management** with dynamic data
- 🧠 Secure & scalable architecture, fulfilling all functional and non-functional requirements

---

## 🧩 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Auth**: JWT, Cookie-based authentication
- **Email Service**: Nodemailer (Gmail)
- **Validation**: express-validator


---

## 📡 API Endpoints

### 🔐 Auth Routes
| Method | Route             | Description                  |
|--------|-------------------|------------------------------|
| POST   | `/register-user`  | Register a new user          |
| POST   | `/login-user`     | Login and receive a token    |

### 🍴 Restaurant Routes
| Method | Route             | Description                       |
|--------|-------------------|-----------------------------------|
| GET    | `/restaurant`     | Fetch all restaurant data         |
| POST   | `/addRestaurant`  | Add a new restaurant (validated)  |

### 📅 Reservation Routes
| Method | Route                     | Description                                |
|--------|---------------------------|--------------------------------------------|
| POST   | `/reserve`                | Create a reservation (auth & validated)    |
| GET    | `/reservations`           | Fetch user’s reservation history (auth)    |
| PUT    | `/reservations/:id`       | Cancel a reservation (auth required)       |

---

## 🛡️ Security

- All reservation routes are **protected** via JWT authentication.
- Tokens expire after **2 hours** and are also stored in **cookies**.
- Passwords are securely encrypted.
- Body payloads are sanitized with `express-validator`.

---

## 📧 Email Notifications

- Upon booking, confirmation emails are sent to:
  - The **user**
  - The **restaurant**
- Powered by **Nodemailer** (Gmail SMTP).

---

## 🧪 API Testing

All APIs are documented and testable via Postman.

📬 https://documenter.getpostman.com/view/26866425/2sB2cX7LW6

---

## ✅ Functional Requirements Covered

- User Registration/Login
- Restaurant CRUD (fetch/add)
- Table Booking (with conflict handling)
- Reservation History & Cancellation
- Notification System (Email)
- Secure, Reliable, and Scalable backend

---

## 📌 Running the Project Locally

```bash
git clone https://github.com/abhishek-2k23/restaurant-table-reservation
cd restaurant-table-reservation
npm install

npm start


