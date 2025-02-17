Here’s an updated README that includes your requirements:

---

# Full-Stack Application

## Overview

This is a full-stack web application built using **Node.js**, **React.js**, and **MongoDB Atlas**. The application features a clean separation between the backend and frontend, leveraging **concurrently** to streamline development.

---

## Features

- Backend: Built with **Node.js** and **Express.js**, connected to **MongoDB Atlas**.
- Frontend: Built with **React.js** for a responsive and dynamic user interface.
- Environment variables for secure configuration.
- **Concurrently** is used to run both frontend and backend during development.

---

## Prerequisites

1. **Node.js** (v18 or higher recommended)
2. **npm** or **yarn** installed
3. MongoDB Atlas URI

---

## Installation

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend folder with the following content:
   ```env
   PORT=3000
   MONGO_URI=<URL>
   CROSS_ORIGIN=*
   ACCESS_TOKEN_SECRET=123456
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=123456
   REFRESH_TOKEN_EXPIRY=10d
   ```
4. Create a `.env` file in the frontend folder with the following content:

```env
VITE_EMAILJS_SERVICE_ID=<enter emailjs service id>
VITE_EMAILJS_TEMPLATE_ID=<enter emailjs template>
VITE_EMAILJS_PUBLIC_KEY=<enter public key>
```

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Main Folder

1. Return to the main project directory:
   ```bash
   cd ..
   ```
2. Install dependencies and set up **concurrently**:
   ```bash
   npm install
   ```

---

## Running the Application

1. Start both the frontend and backend using:

   ```bash
   npm run dev
   ```

   This uses **concurrently** to run the frontend and backend simultaneously.

2. The application should be accessible at:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000`

---

## Formatting the folders using prettier

```bash
   npm run format
```

## Folder Structure

- `/frontend`: Contains the React.js application.
- `/backend`: Contains the Node.js backend with routes and database configuration.

---
