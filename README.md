# 💰 Expense Tracker (MERN)

A simple full-stack Expense Tracker that lets users securely manage and categorize their daily expenses with a clean dashboard.

---

# 🚀 Features

- 🔐 **User Authentication** (JWT + Cookies)
- ➕ Add and 🗑️ delete expenses
- 📊 Category-wise expense grouping
- 👤 User-specific data (no data mixing)
- ⏱️ Automatic timestamps for each expense

---

# 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### Frontend
- React (Hooks)
- Axios
- Tailwind CSS

---

# 📁 Project Structure

```
expenseTracker/
│
├── Backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── expense.controller.js
│   │   │   └── user.controller.js
│   │   │
│   │   ├── DB/
│   │   │   └── (database connection files)
│   │   │
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── expense.model.js
│   │   │   └── user.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.route.js
│   │   │   ├── expense.route.js
│   │   │   └── user.route.js
│   │   │
│   │   └── index.js
│   │
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── text.txt
│
├── Frontend/
│   ├── node_modules/
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── sections/
│   │   │
│   │   ├── Dashboard.jsx
│   │   ├── ExpenseChart.jsx
│   │   ├── ExpensePieChart.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── vite.config.js
│
└── README.md
```

---

# 🔗 API Endpoints

## 🔐 Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/user/me`

## 💰 Expense
- `POST /api/expense/add`
- `GET /api/expense/get`
- `DELETE /api/expense/delete/:id`

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/expenseTracker.git
cd expenseTracker
```

---

## 2️⃣ Backend Setup

```bash
cd Backend
npm install
```

### 🔐 Create `.env` file in `/Backend`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

👉 Example:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/expenseDB
JWT_SECRET=mysecret123
CLIENT_URL=http://localhost:3000
```

---

### ▶️ Run Backend

```bash
npm run dev
```

Backend runs at:
```
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

```bash
cd ../Frontend
npm install
```

### (Optional) Create `.env` in `/Frontend`

```env
VITE_API_URL=http://localhost:5000/api
```

---

### ▶️ Run Frontend

```bash
npm run dev
```

Frontend runs at:
```
http://localhost:3000
```

---

# ▶️ Run Both Together

Open **two terminals**:

### Terminal 1 (Backend)
```bash
cd Backend
npm run dev
```

### Terminal 2 (Frontend)
```bash
cd Frontend
npm run dev
```

---

# 🔐 Authentication Flow

1. User logs in/registers  
2. Backend sends JWT in **httpOnly cookie**  
3. Browser stores cookie automatically  
4. Axios sends cookie with each request  
5. Backend verifies user and returns data  

---



# 🚀 Future Improvements

- ✏️ Edit expenses
- 📊 Charts (Pie / Bar)
- 📅 Monthly analytics
- 🔐 Refresh token system

---

# 👨‍💻 Author

**Gunjesh Nayak**

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub!
