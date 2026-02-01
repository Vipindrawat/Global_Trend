# 📝 Task Management Application

A full-stack **Task Management App** that allows users to register, log in, and manage their daily tasks efficiently with authentication.

---

## Live Demo
### Frontend: https://global-trend-frontend.onrender.com
### Backend:  https://global-trend-backend-xp5s.onrender.com
.
### Test Signin Credential :
#### Email: vipin@gmail.com
#### Password: vipin
or
#### Email: mayank@gmail.com
#### Password: mayank

## 🚀 Features

- 🔐 User Authentication (JWT-based)
- 📝 Create, Read, Update, Delete (CRUD) Tasks
- ✅ Mark tasks as Completed / Pending
- ✏️ Inline task editing
- 🗑️ Delete tasks
- 🔒 Protected routes
- 📱 Fully responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)

---

## 📂 Project Structure

task-manager/
│
├── frontend/
│ ├── src/
│ │ ├── Components/
| | | ├── AddTask.jsx
| | | ├── Layout.jsx
| | | ├── Navbar.jsx
| | | ├── ProtectedRoute.jsx
| | | ├── Registeer.jsx
| | | ├── Signin.jsx
| | | ├── Tasks.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│
├── backend/
│ ├── Routes/
| | ├── TaskRoutes.js
| | ├── UserRoutes.js
│ ├── Middleware/
| | ├── AuthenticationMiddleware.js
│ ├── Models/
| | ├── TaskModel.js
| | ├── userModel.js
│ └── index.js


---

## ⚙️ Environment Variables

### Backend (`.env`)


PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


### Frontend (`.env`)


VITE_API_URL=http://localhost:5000


---

## ▶️ Run the Project Locally

### 1️⃣ Clone the repository


git clone https://github.com/Vipindrawat/Global_Trend.git

cd task-manager


---

### 2️⃣ Backend setup


cd Backend

npm install


npm run dev


---

### 3️⃣ Frontend setup


cd Frontend

npm install

npm start


---

## 🔐 Authentication Flow

- User registers or logs in
- JWT token is generated
- Token is stored in `localStorage`
- Token is sent in request headers
- Backend middleware validates token

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|------|--------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/signin` | Login user |
| GET | `/api/task/myTasks` | Get user tasks |
| POST | `/api/task/addTask` | Add new task |
| PUT | `/api/task/updateTask/:id` | Update task |
| DELETE | `/api/task/deleteTask/:id` | Delete task |

---
## 📌 Future Improvements

- 🔄 Refresh tokens
- 📅 Due date support
- 🌙 Dark mode
- 🔔 Notifications
- 📊 Task analytics

---

## 👨‍💻 Author

**Vipin Rawat**

- GitHub: https://github.com/vipindrawat  
- LinkedIn: https://www.linkedin.com/in/vipin-rawat-402744235/

---

## ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub.
