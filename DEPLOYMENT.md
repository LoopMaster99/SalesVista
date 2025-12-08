# Deployment Guide

This guide will help you deploy the **Retail Sales System** to the cloud for free.

## Prerequisites
- A GitHub account.
- A [Render](https://render.com/) account (for Backend).
- A [Vercel](https://vercel.com/) account (for Frontend).
- Your MongoDB connection string (from MongoDB Atlas).

---

## 1. Backend Deployment (Render)

1.  Log in to **Render**.
2.  Click **"New +"** -> **"Web Service"**.
3.  Select **"Build and deploy from a Git repository"**.
4.  Connect your GitHub account and select the **trueEstate** repository.
5.  **Configure the service**:
    -   **Name**: `trueestate-backend` (or similar)
    -   **Region**: Choose one close to you (e.g., Singapore, Frankfurt).
    -   **Root Directory**: `backend`  <-- **IMPORTANT**
    -   **Runtime**: **Docker**
    -   **Instance Type**: Free
6.  **Environment Variables** (Scroll down to "Advanced"):
    -   Click **"Add Environment Variable"**.
    -   **Key**: `SPRING_DATA_MONGODB_URI`
    -   **Value**: *Paste your MongoDB connection string here* (Make sure it has the correct username/password).
7.  Click **"Create Web Service"**.

> **Note**: The first build may take a few minutes. Wait until you see "Live" or a green checkmark.
> **Copy the Backend URL**: It will look like `https://trueestate-backend.onrender.com`. You will need this for the frontend.

---

## 2. Frontend Deployment (Vercel)

1.  Log in to **Vercel**.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import the **trueEstate** repository.
4.  **Configure the project**:
    -   **Framework Preset**: Vite (should be auto-detected).
    -   **Root Directory**: Click "Edit" and select `frontend`. <-- **IMPORTANT**
5.  **Environment Variables**:
    -   Click to expand **"Environment Variables"**.
    -   **Key**: `VITE_API_BASE_URL`
    -   **Value**: *Paste your Render Backend URL here* (e.g., `https://trueestate-backend.onrender.com`).  
        *Do not include `/api/sales` at the end, just the base domain.*
6.  Click **"Deploy"**.

---

## 3. MongoDB Connectivity Verification

If the backend fails to connect to MongoDB:
1.  Go to **MongoDB Atlas**.
2.  Navigate to **"Network Access"**.
3.  Ensure there is an IP address `0.0.0.0/0` (Allow Access from Anywhere) in the list. This is required because Render (free tier) uses dynamic IP addresses.

---

## 4. Final Verification

1.  Open your **Vercel** app URL (e.g., `https://trueestate-frontend.vercel.app`).
2.  The page should load.
3.  The data should appear (loading from your Render backend).
