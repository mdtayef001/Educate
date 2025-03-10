# Educate

## Purpose
Educate is a scholarship management system that allows students to search for suitable universities and scholarships. Students can apply for scholarships directly through the system. The platform also includes role-based access, reviews, and administrative features for managing scholarships, users, and reviews.

## Live URL
[Live Demo](https://educate-23aca.web.app/)

---

## Key Features
- **Responsive Design**
- **Search Scholarships**
- **Apply for Scholarships**
- **Role-Based Login (Student, Admin, Moderator)**
- **Add Reviews**
- **Admin and Moderator Controls:**
  - Update, delete, and add scholarships
  - Manage reviews and users

---

## Tech Stack

### Frontend
- **React.js** (UI Library)
- **TailwindCSS** (Styling)
- **DaisyUI** (UI Components)
- **Recharts** (Charts & Graphs)
- **Axios** (API Requests)
- **Cloudinary** (Image Uploads)
- **Firebase** (Authentication & Hosting)
- **Prop-Types** (Type Checking)
- **React-Helmet-Async** (SEO Optimization)
- **React-Hook-Form** (Form Handling)
- **React-Responsive-Carousel** (Carousel Components)
- **SweetAlert2** (Alerts & Notifications)
- **Swiper** (Image Sliders)

### Backend
- **Express.js** (Backend Framework)
- **MongoDB** (Database)
- **JWT (JSON Web Tokens)** (Authentication & Authorization)

---

## Installation & Setup (Local Testing)

### Prerequisites
- Node.js (Latest Version Recommended)
- MongoDB (Local or Cloud Instance)

### Clone Repository
```sh
  git clone https://github.com/yourusername/educate.git
  cd educate
```

### Frontend Setup
1. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```
2. Create a `.env` file and add the required environment variables:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   ```
3. Run the frontend:
   ```sh
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```


