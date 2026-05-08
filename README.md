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

This application is configured as a single deployment monorepo. The Node.js backend serves the React frontend statically.

1. **Push to GitHub**: Push the `TeamTaskManager` folder to your GitHub account.
2. **Deploy on Railway**:
   - Go to [Railway.app](https://railway.app/) and create a new project -> **Deploy from GitHub repo**.
   - Select your repository. Railway will automatically detect the root `package.json`.
3. **Environment Variables**:
   - In your Railway service settings, add the following variables:
     - `MONGODB_URI`: `mongodb+srv://aryaveershekhawat2_db_user:Anurag%402004@cluster0.5qomxl9.mongodb.net/teamtaskmanager?appName=Cluster0`
     - `JWT_SECRET`: Any random secure string
     - `PORT`: `5000`
4. **Deploy**: Railway will run `npm run build` (which builds the frontend) and then `npm start` (which runs the backend serving the frontend).
5. **Generate Domain**: Once deployed, click on the service -> Settings -> Generate Domain to get your live URL.
6. Record your 2-5 min demo video showcasing the live URL.

## Demo Video
*(Link your demo video here)*
