# Atlas — Modern EdTech Learning Platform

<div align="center">

### Learn. Build. Grow.

A full-stack learning management platform built with the MERN stack, designed to provide a complete ecosystem for students, instructors, and administrators.

<img width="1536" height="1024" alt="ChatGPT Image Sep 21, 2026, 02_11_28 AM" src="https://github.com/user-attachments/assets/ad877861-457e-4864-a71d-1cfd5e737be3" />


<br/>

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payments-3395FF?style=for-the-badge)](https://razorpay.com/)

</div>

# Frontend-https://atlas-livid-iota-48.vercel.app/
# Backend-https://atlas-backend-8qo4.onrender.com/

## Use below IDs for quick checkout at features or create your own ID
### Use Instructor ID - arceus930076@gmail.com password-1234
### Use Student ID- mohit07gupta007@gmail.com password-1234


---

## 📖 Overview

**Atlas** is a full-stack EdTech and Learning Management System designed to connect learners with structured, high-quality educational content.

The platform provides a complete learning workflow:

- Students can discover and purchase courses
- Instructors can create and manage courses
- Students can watch video lectures and track their progress
- Secure authentication and role-based authorization protect platform resources
- Razorpay enables online course payments
- Students can rate and review courses
- Instructors can monitor course enrollment and revenue
- Cloudinary handles media storage
- Email and OTP-based workflows support authentication and account recovery

The project was built to simulate a production-oriented EdTech platform rather than a simple course listing application.

---

## ✨ Key Features

### 👨‍🎓 Student Features

- User registration and login
- OTP-based verification
- Secure authentication
- Browse available courses
- Search and explore course categories
- View complete course details
- Course purchasing
- Razorpay payment integration
- Enrolled course dashboard
- Video-based learning
- Course progress tracking
- Completed lecture tracking
- Course ratings and reviews
- Profile management
- Password management
- Cart functionality
- Wishlist / saved learning workflow
- Responsive learning interface

---

### 👨‍🏫 Instructor Features

- Instructor dashboard
- Create new courses
- Edit existing courses
- Course category management
- Course pricing
- Course thumbnail upload
- Section creation
- Sub-section / lecture creation
- Video lecture management
- Course publishing workflow
- Course editing workflow
- Student enrollment information
- Course performance information
- Revenue-related analytics
- Course management interface

---

### 🛡️ Authentication & Authorization

Atlas implements protected authentication and role-based authorization.

Supported roles include:

- Student
- Instructor
- Admin

Authentication is handled using:

- JWT
- Secure authentication middleware
- Password hashing with bcrypt
- Protected routes
- Role-based authorization
- OTP verification
- Password reset workflow

The backend validates authenticated requests before allowing access to protected resources.

---

### 💳 Payment System

Atlas integrates **Razorpay** for online course purchases.

The payment workflow includes:

```text
Student
   │
   ▼
Select Course
   │
   ▼
Create Payment Order
   │
   ▼
Razorpay Checkout
   │
   ▼
Payment Verification
   │
   ▼
Course Enrollment
   │
   ▼
Student Dashboard
