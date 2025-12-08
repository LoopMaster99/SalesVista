# Retail Sales Management System

## 1. Overview
A full-stack Retail Sales Management System developed for the TruEstate SDE Intern Assignment. It provides a real-time interface to search, filter, sort, and paginate through a large dataset of 734k sales transactions efficiently. The system utilizes server-side processing with Spring Boot and MongoDB to minimize latency and memory usage, delivering a high-performance experience on a responsive React frontend.

## 2. Tech Stack
*   **Backend**: Java 17, Spring Boot 3, Spring Data MongoDB, Maven.
*   **Database**: MongoDB (Atlas/Local).
*   **Frontend**: React, Vite, Tailwind CSS, Lucide React.
*   **Deployment**: Docker, Render, Vercel.

## 3. Search Implementation Summary
Search is implemented in the backend using `MongoTemplate` and `Criteria`. It performs a server-side, case-insensitive regex match on both **Customer Name** and **Phone Number** fields simultaneously. This allows for real-time search results without loading the entire dataset into application memory.

## 4. Filter Implementation Summary
Filtration is handled dynamically via `Criteria` construction in the `SalesService`. It supports multi-select filtering for **Region**, **Gender**, **Category**, **Payment Method**, and **Date Range**. The query uses logical `OR` for values within the same category and logical `AND` across different categories, ensuring precise data retrieval.

## 5. Sorting Implementation Summary
Sorting is achieved using MongoDB's native sort capabilities. The backend accepts `sortBy` (field) and `sortOrder` (asc/desc) parameters to generate a `Sort` object. This ensures that data is ordered at the database level before being paginated, maintaining consistency and performance across large datasets.

## 6. Pagination Implementation Summary
Pagination is strictly server-side. The client requests a specific page number and size (e.g., page 1, 20 items). The backend calculates the offset and uses MongoDB's `skip()` and `limit()` operations to fetch only the requested slice of data. This reduces payload size and renders the UI instantly responsive.

## 7. Setup Instructions
### Backend Setup
1.  **Prepare Data**: 
    *   Place your `sales.csv` file in `backend/src/main/resources/data/`.
    *   **Option A: MongoDB Atlas (Cloud)**: 
        *   Truncate `sales.csv` to ~700k records (to fit 512MB limit).
        *   Set `spring.data.mongodb.auto-index-creation=false` in `application.properties`to ensure the import fits within the 512MB storage limit.
    *   **Option B: MongoDB Community (Local)**:
        *   The full 1M dataset works fine.
        *   Start service: `mongod`.
        *   Default URI: `mongodb://localhost:27017`.
2.  **Configure Database**: 
    *   Open `backend/src/main/resources/application.properties`.
    *   Set `spring.data.mongodb.uri` to your connection string.
3.  **Start Application**:
    *   Run `mvn spring-boot:run` inside the `backend` directory.
    *   **First Run**: The application will automatically import the CSV data into MongoDB. This happens only once.

### Frontend Setup
1.  **Prerequisites**: Node.js, npm.
2.  **Install**: Run `npm install` in the `frontend` directory.
3.  **Run**: Execute `npm run dev`.
4.  **Access**: Open `http://localhost:5173` to view the application.
