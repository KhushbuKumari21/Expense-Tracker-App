📊 Expense Tracker App

A full-stack Expense Tracker Application built using Node.js, Express, MongoDB, and JWT Authentication.
It allows users to register, login, and manage their daily expenses with category-wise analytics.

# 🚀 Features
## 🔐 Authentication
    User Registration
    User Login
    JWT Token Authentication

## 💰 Expense Management
    Add Expense (amount, category, date, note)
    Edit Expense
    Delete Expense
    Get All Expenses (user-specific)

## 📊 Dashboard
    Category-wise expense summary
    Total spending per category


# 🛠️ Tech Stack
   ##  Backend:-
    Node.js
    Express.js

    MongoDB (Mongoose)
    JWT (Authentication)
    bcryptjs (Password hashing)
    cors

   ## Frontend :-
   React Native
   Axios
   CSS

   # 📁 Project Structure
   D:\Today Project
│
├── **backend**
│   ├── models
│   │   ├── User.js
│   │   └── Expense.js
│   │
│   ├── routes
│   │   ├── auth.js
│   │   └── expense.js
│   │
│   ├── middleware
│   │   └── auth.js
│   │
│   ├── .env
│   ├── server.js
│
├──**frontend**
│   ├── screens
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── AddExpense.js
│   │   └── Dashboard.js
│   │
│   ├── App.js
│
└── **Readme.md**

# ⚙️ Installation
## 1️⃣ Clone project
    git clone <your-repo-link>
    cd backend
## 2️⃣ Install dependencies
    npm install

## 3️⃣ Setup .env
Create .env file:
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key

## 4️⃣ Run server
   node server.js

Server will run on:

**http://localhost:5000**


📡 Backend APIs
🔐 Auth
POST /api/auth/register   → Register user
POST /api/auth/login      → Login user (returns JWT token)

💰 Expenses (Protected - JWT Required)
GET    /api/expenses        → Get all user expenses
POST   /api/expenses        → Add new expense
PUT    /api/expenses/:id    → Update expense
DELETE /api/expenses/:id    → Delete expense

📊 Dashboard / Summary API (Protected - JWT Required)
GET /api/expenses/summary   → Category-wise total expense



# 📱 Frontend Setup (React Native - Expo)
## 1. Create Project
    npx create-expo-app frontend

## 2. Go to project folder
   cd frontend
## 3. Install dependencies
npm install axios
Navigation setup
npm install @react-navigation/native
npm install @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context

## 4. Run app
npx expo start

Then scan QR code in Expo Go app 📱

we have use backend IP like this in frontend:
http://10.59.28.109:5000/api/auth/login
http://10.59.28.109:5000/api/auth/register
http://10.59.28.109:5000/api/expenses