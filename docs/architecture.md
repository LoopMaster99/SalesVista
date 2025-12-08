# Architecture Document

## 1. Backend Architecture

The backend is built using **Spring Boot 3** and **Java 17**, following a layered architecture:

*   **Controller Layer** (`com.app.controller`): Handles HTTP requests.
    *   `SalesController`: Exposes `/api/sales` endpoint.
*   **Service Layer** (`com.app.service`): Contains business logic.
    *   `SalesService`: Implements the filtering using Java Streams. It processes the list of `SalesRecord` objects based on `SalesQueryParams`.
*   **Data Layer** (`com.app.data`, `com.app.util`):
    *   `DataLoader`: Loads the CSV file into memory on startup (`@PostConstruct`).
    *   `CsvParser`: Uses **Jackson CSV** to parse the `sales.csv` file into Java POJOs.
*   **Model Layer** (`com.app.model`):
    *   `SalesRecord`: Maps 1:1 to the CSV columns.
    *   `SalesQueryParams`: Captures search, filter, sort, and pagination parameters.

### Data Flow
1.  CSV -> `DataLoader` (Memory)
2.  Request -> `SalesController` -> `SalesService`.
3.  `SalesService` creates a Stream from `DataLoader`.
4.  Stream is Filtered (Search, Tags, Region, etc.) -> Sorted -> Paginated.
5.  Result -> `SalesController` -> JSON Response.

## 2. Frontend Architecture

The frontend is a **React 18** application built with **Vite**.

*   **Framework**: React + Vite
*   **Styling**: Tailwind CSS + Custom "Shadcn-like" Components.
*   **State Management**: Local State (`useState`, `useEffect`) in `SalesPage`.
*   **Routing**: React Router DOM (Single page `/sales`).

### Module Responsibilities
*   **`components/ui`**: Reusable primitive components (Button, Input, Table, Select).
*   **`pages`**: formatting and business logic for specific views (`SalesPage`).
*   **`services`**: API communication (`api.js` uses **Axios**).
*   **`lib`**: Utilities (`cn` for class merging).

### Folder Structure
```
frontend/
├── src/
│   ├── components/ui/  # Atoms (Button, Input, etc.)
│   ├── pages/          # Views (SalesPage)
│   ├── services/       # API calls
│   ├── lib/            # Utils
│   └── App.jsx
```

## 3. Design Decisions
*   **In-Memory Database**: Since the dataset is a single CSV, we load it into memory for extremely fast filtering and sorting without the overhead of a SQL database.
*   **Java Streams**: Used for clean, functional implementation of the complex filtering logic.
*   **Tailwind CSS**: Used to match the provided Figma/Screenshot aesthetics accurately and quickly.
