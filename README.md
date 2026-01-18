# ScholarArch: Academic File Repository

ScholarArch is a full-stack academic repository platform designed to facilitate the storage, discovery, and retrieval of academic materials such as past exam papers, lecture notes, and research documents. By leveraging the **PERN stack (PostgreSQL, Express, React, Node.js)**, the application delivers a robust, scalable, and high-performance environment for academic resource management.

---

## 📌 Project Objectives

- Centralize academic materials in a single, searchable platform  
- Improve accessibility to past questions and learning resources  
- Ensure data integrity and efficient file handling  
- Provide a clean, responsive, and intuitive user interface  

---

## 🏗️ Technical Architecture

ScholarArch adopts a **monorepo architecture**, clearly separating frontend and backend concerns while allowing unified dependency management.

### 🔹 Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS v4
- **Features**:
  - Responsive grid-based layout
  - Reusable search components
  - Skeleton loaders for improved UX
  - Optimized rendering for large datasets

### 🔹 Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Responsibilities**:
  - RESTful API endpoints
  - File upload and streaming
  - Transactional database operations

### 🔹 Database
- **Engine**: PostgreSQL
- **ORM / Query Builder**: Knex.js
- **Purpose**:
  - Schema migrations
  - Relational integrity
  - Optimized querying

### 🔹 File Storage
- **Middleware**: Multer
- **Storage Type**: Local server-side storage
- **Design Choice**:
  - Only sanitized filenames are stored in the database
  - Improves portability and migration flexibility

---

## 📁 System Structure

```text
fileRepository/
├── Backend/                  # Node/Express backend API
│   ├── Config/               # Database and middleware configurations
│   ├── Controllers/          # Business logic (upload, fetch, download)
│   ├── Models/               # Knex.js query definitions
│   ├── Routes/               # REST API routes
│   ├── migrations/           # Database schema migrations
│   ├── public/uploads/       # Stored academic files (PDFs, images)
│   └── server.js             # Backend entry point
│
├── frontend/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/       # UI components (NavBar, ExamCard, SearchBar, SkeletonCard)
│   │   └── pages/            # Pages (HomePage, ExplorePage)
│
└── package.json              # Root monorepo orchestration
