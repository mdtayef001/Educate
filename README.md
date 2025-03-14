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
  git clone https://github.com/mdtayef001/Educate.git
  cd Educate
```

### Frontend Setup

1. Install dependencies:
   ```sh
   cd client
   npm install
   ```
2. Create a `.env` file and add the required environment variables:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_cloudinary_API_KEY=you_api_key
   VITE_PAYMENT_PK_KEY=your_stripe_pk_key
   ```
3. Run the frontend:
   ```sh
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   PORT=5000
   JWT_SECRET=your_secret_key
   DB_USER=your_mongodb_user_name
   DB_PASS=your_mongodb_password
   STRIPE_SK_KEY=your_stripe_sk_key
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```
   
## Testing

- **gamil:admin@gmail.com**
- **password:T@ayef9600**
- **gamil:moderator@gmail.com**
- **password:T@ayef9600**
- **gamil:user@gmail.com**
- **password:T@ayef9600**
