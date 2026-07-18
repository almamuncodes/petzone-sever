# 🐾 PetZone Server

> Backend API for the PetZone AI platform. Built with Node.js, Express.js, MongoDB, and BetterAuth to provide secure authentication, product management, AI integration, and RESTful APIs.

![Node.js](https://img.shields.io/badge/Node.js-22-green)
![Express.js](https://img.shields.io/badge/Express.js-Backend-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![BetterAuth](https://img.shields.io/badge/Auth-BetterAuth-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

---

# 📖 About

PetZone Server is the backend of the **PetZone AI** application.

It provides secure authentication, user management, product APIs, pet APIs, AI recommendation endpoints, and database operations. The server is designed with scalability and security in mind, making it suitable for modern full-stack applications.

---

# ✨ Features

## 🔐 Authentication

- BetterAuth Authentication
- Secure Login & Registration
- Session Management
- Protected Routes
- Role-Based Authorization

---

## 👤 User Management

- Create User
- Update Profile
- Manage Roles
- Delete User

---

## 🐶 Pet Management

- Add Pet
- Update Pet
- Delete Pet
- Get All Pets
- Get Single Pet

---

## 🛍 Product Management

- Add Product
- Update Product
- Delete Product
- Product Categories
- Product Filtering
- Search Products

---

## 🤖 AI Integration

- AI Product Recommendation API
- AI Pet Care Suggestion API
- AI Chat Endpoint

---

## ☁ Image Upload

- Cloudinary Integration
- Image Upload API
- Image Delete API

---

## 🔒 Security

- Environment Variables
- CORS Protection
- Secure API Routes
- Error Handling
- Input Validation

---

# 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- BetterAuth
- Cloudinary
- Google Gemini API
- dotenv
- CORS

---

# 📁 Project Structure

```
src/
│
├── controllers/
├── routes/
├── middleware/
├── config/
├── utils/
├── services/
├── models/
└── index.js
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/almamuncodes/petzone-server.git
```

## Install Dependencies

```bash
npm install
```

## Create Environment File

Create a `.env`

```env
PORT=5000

MONGODB_URI=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

GOOGLE_GENERATIVE_AI_API_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Run Development Server

```bash
npm run dev
```

---

## Build Project

```bash
npm start
```

---

# 📡 API Endpoints

## Authentication

```
POST    /api/auth/sign-up
POST    /api/auth/sign-in
POST    /api/auth/sign-out
GET     /api/auth/session
```

## Users

```
GET     /api/users
GET     /api/users/:id
PATCH   /api/users/:id
DELETE  /api/users/:id
```

## Pets

```
GET     /api/pets
GET     /api/pets/:id
POST    /api/pets
PATCH   /api/pets/:id
DELETE  /api/pets/:id
```

## Products

```
GET     /api/products
GET     /api/products/:id
POST    /api/products
PATCH   /api/products/:id
DELETE  /api/products/:id
```

## AI

```
POST /api/ai/recommend
POST /api/ai/chat
```

---

# ⚙ Environment Variables

```env
PORT

MONGODB_URI

BETTER_AUTH_SECRET
BETTER_AUTH_URL

GOOGLE_GENERATIVE_AI_API_KEY

CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

---

# 🚀 Deployment

The backend can be deployed on:

- Vercel
- Railway
- Render
- DigitalOcean
- VPS

---

# 📌 Future Improvements

- Payment Integration
- Order Management
- Wishlist API
- Notification System
- Analytics Dashboard
- Admin Statistics
- AI Image Recognition

---

# 🤝 Contributing

Contributions are welcome!

1. Fork this repository

2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Developer

**MD Al-Mamun Islam**

GitHub

https://github.com/almamuncodes

LinkedIn

https://linkedin.com/in/almamunislam

---

# 📄 License

This project is licensed under the **MIT License**.

---

⭐ If you found this project helpful, don't forget to give it a **Star**.
