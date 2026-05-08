# Team Task Manager

A full-stack project management application built with React.js (Vite) and Node.js (Express), featuring Role-Based Access Control, a MySQL database (via Prisma), and a custom Canvas Particle Network landing effect.

## Features
- **Authentication**: JWT-based authentication with Admin/Member roles.
- **Projects & Tasks**: Admins can create projects and assign tasks. Members can view tasks and update their status.
- **Dashboard**: Overview of tasks, progress, and overdue items.
- **Antigravity Particle Effect**: An interactive canvas background on the login screen.

## Local Development

### 1. Database Setup (MongoDB Atlas)
Ensure you have a MongoDB Atlas account and cluster set up. Obtain your connection URI.

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/teamtaskmanager"
JWT_SECRET="your_super_secret_jwt_key"
PORT=5000
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Railway Deployment (Mandatory)

Since your code is pushed with the `TeamTaskManager/` folder, you must deploy the **Backend** and **Frontend** as **two separate services** in Railway.

1. **Deploy Backend**:
   - Go to Railway, create a new service -> **Deploy from GitHub repo**.
   - Select your repo.
   - Go to the service **Settings** -> **Root Directory** and set it to `/TeamTaskManager/backend`.
   - In **Variables**, add:
     - `MONGODB_URI`: `mongodb+srv://aryaveershekhawat2_db_user:Anurag%402004@cluster0.5qomxl9.mongodb.net/teamtaskmanager?appName=Cluster0`
     - `JWT_SECRET`: Any random secure string
     - `PORT`: `5000`
   - Generate a Domain for the backend. Copy this URL.

2. **Deploy Frontend**:
   - Create another new service from the same GitHub repo.
   - Go to **Settings** -> **Root Directory** and set it to `/TeamTaskManager/frontend`.
   - In **Variables**, add:
     - `VITE_API_URL`: Paste the backend domain URL you copied earlier (e.g., `https://your-backend-app.up.railway.app`)
   - Generate a Domain for the frontend. This is your live website!

3. Record your 2-5 min demo video showcasing the live URL.

## Demo Video
*(Link your demo video here)*
