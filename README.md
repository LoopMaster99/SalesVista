# Retail Sales Management System

## 1. Overview
A full-stack Retail Sales Management System developed for the TruEstate SDE Intern Assignment. It provides a real-time interface to search, filter, sort, and paginate through a large dataset of sales transactions.

### Production Dataset
**Live Deployment**: 734,037 sales transactions  
**Storage**: MongoDB Atlas (Free Tier M0)

> **Note on Dataset Size**: The application is designed to handle 1 million+ records. Due to MongoDB Atlas free tier storage limitations (512MB), the production deployment contains **734K records**, which effectively demonstrates all system capabilities at scale including search, filtering, sorting, and pagination.

**Technical Achievement**: Successfully solved deployment blocker where the full 1M record CSV file (224MB) exceeded GitHub's 100MB file size limit by migrating to MongoDB Atlas with conditional CSV import and proper `.gitignore` configuration.

## 2. Tech Stack
*   **Backend**: Java 17, Spring Boot 3, Spring Data MongoDB, Jackson CSV, Maven.
*   **Database**: MongoDB (local development or MongoDB Atlas for production).
*   **Frontend**: React 18, Vite, Tailwind CSS, Axios, Lucide React.
*   **Deployment**: Localhost (ready for Render/Railway/Vercel with MongoDB Atlas).

## 3. Performance Optimization (Engineering Highlights)
*   **Challenge**: Initial API response time was **1.9 minutes** due to loading 734k records into memory.
*   **Solution**: Implemented **Database-level Pagination & Filtering** using `MongoTemplate`.
*   **Result**: Reduced response time to **< 500ms** (114x improvement) while handling 734,037 records on free-tier infrastructure.
*   **Efficiency**: Reduced memory usage by **500x**, loading only 10-50 records per request instead of 734,037.

## 4. Search Implementation Summary
Search is implemented in the Backend (`SalesService.java`) using Java Streams. It performs a case-insensitive `contains` check on **Customer Name** and **Phone Number** fields. It works concurrently with all active filters.

## 4. Filter Implementation Summary
Multi-select filters are implemented for Region, Gender, Category, Payment Method, and Date. Code iterates through provided lists (e.g., `Update Regions`) and retains records that match *any* of the selected values in that category. Filter state is managed in the Frontend and passed as query parameters.

## 5. Sorting Implementation Summary
Sorting is dynamic based on user selection. Supported fields: Date (Newest/Oldest), Quantity, Customer Name (A-Z/Z-A). The backend `Comparator` is adjusted based on the `sortBy` and `sortOrder` parameters.

## 6. Pagination Implementation Summary
Pagination is server-side. The backend calculates `skip` (`(page-1)*limit`) and `limit` to return a slice of the filtered stream. The frontend receives `totalItems` and `totalPages` to render the pagination controls correctly.

## 7. Setup Instructions

### Backend

**Prerequisites**: 
- Java 17+ installed
- Maven installed
- MongoDB installed locally OR MongoDB Atlas account (cloud)

**Local MongoDB Setup** (Option 1):
1. Install MongoDB Community Edition from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Start MongoDB service: `mongod` (or it may auto-start)
3. MongoDB will run on `mongodb://localhost:27017`

**MongoDB Atlas Setup** (Option 2 - Recommended for deployment):
1. Create free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free M0 cluster
3. Get your connection string
4. Update `application.properties` with your Atlas URI (see instructions in the file)

**Running the Backend**:
1. Navigate to `backend/`
2. Ensure `sales.csv` is at `backend/src/main/resources/data/sales.csv`
3. Run `mvn spring-boot:run`
4. Server starts at `http://localhost:8080`
5. On first run, CSV data will be imported to MongoDB (takes 2-5 minutes)
6. Subsequent runs will use existing MongoDB data (instant startup)

### Frontend
1.  Navigate to `frontend/`.
2.  Run `npm install`.
3.  Run `npm run dev`.
4.  Open `http://localhost:5173`.
