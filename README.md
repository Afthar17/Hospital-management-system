# 🏥 Hospital Management System (MERN)

This is a **Hospital Management System** built with the **MERN stack (MongoDB, Express.js, React, Node.js)**.  
It supports role-based access for **Admin**, **Receptionist**, **Doctor**, and **Lab Assistant**.  

The system handles **patients, billing, lab reports, and invoices** with PDF generation and **Cloudinary integration**.

---

## ✨ Features

### 🔹 Authentication & Roles
- Secure JWT authentication.
- Roles: **Admin**, **Receptionist**, **Doctor**, **Lab Assistant**.
- Role-based access to features and routes.

### 🔹 Receptionist
- Add new patients with details.
- Automatically generate and upload **Invoice PDF** (via Cloudinary).
- View all patients with **bill amount & payment status**.
- Mark bills as **Paid**.

### 🔹 Doctor
- View their assigned patients.
- View patient details & history.
- Prescriptions handling.

### 🔹 Lab Assistant
- Add **Lab Reports** for patients.
- Generate **Lab Report PDF** (via PDFKit).
- Upload lab reports to Cloudinary with **direct view link**.

### 🔹 Admin
- View all patients across the hospital.
- Access **billing details** and **consulting doctor name** for each patient.
- Monitor financials and patient data.

### 🔹 Cloudinary Integration
- **Invoices** and **Lab Reports** are generated as PDFs using **PDFKit**.
- PDFs are uploaded to Cloudinary automatically.
- Returns a **public URL** (view/download).

---
## ⚙️ Tech Stack

- **Frontend**: React, Zustand (state management), Axios, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **File Storage**: Cloudinary
- **PDF Generation**: PDFKit

---
TEST

Receptionist
email: leo@recepton.com
password: 12345678

Doctor
email: jane@doctor.com
password: 12345678

Lab Assistant
email: dav@gmail.com
password: 12345678

Admin
email: john@admin.com
password: 12345678

## 📂 Project Structure

