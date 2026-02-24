# ExploreSpot 🌍 (ESF)

ExploreSpot is a modern, full-stack travel platform designed to help users plan trips, discover new destinations, share their travel experiences, and even promote local businesses. Powered by AI and real-time data, it offers a seamless experience for modern explorers.

## 🚀 Key Features

- **AI-Powered Trip Planning**: Get personalized travel itineraries using Google Gemini AI.
- **Smart Authentication**:
    - Secure Email/Password Signup & Login.
    - One-click **Google OAuth** integration.
    - **Forgot Password flow** with 6-digit OTP email verification.
- **Experience Sharing**: Post your travel stories ("Spots") with images and descriptions.
- **Business Promotions**: Local businesses can promote their services to travelers.
- **Weather Integration**: Real-time weather data for your destinations.
- **Dynamic Exploration**: Discover recent experiences and popular spots on a curated Explore page.

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **Vanilla CSS** (Custom Premium Design)
- **Axios** (API Requests)
- **React Router Dom** (Navigation)

### Backend
- **Node.js & Express**
- **MongoDB** (Mongoose ODM)
- **Passport.js** (OAuth 2.0 & Session Management)
- **Nodemailer** (OTP Email Service)
- **JWT** (JSON Web Tokens for Auth)

### AI & APIs
- **Google Gemini API** (AI Description & Itinerary Planning)
- **OpenWeatherMap API** (Real-time weather)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (Atlas or Local)
- Google Cloud Console Project (for Google Auth)
- Gmail App Password (for OTP service)

### 1. Clone the Repository
```bash
git clone https://github.com/saisarayu/Explore.git
cd Explore
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
GEMINI_API_KEY=your_gemini_key
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/google/callback
SESSION_SECRET=your_session_secret
```
Run the backend:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend/` directory and add:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
Run the frontend:
```bash
npm run dev
```

## 📸 Project Structure

```text
Explore/
├── backend/               # Express Server & API
│   ├── model/             # Mongoose Schemas (User, Spot, Business, etc.)
│   ├── routes/            # API Endpoints (Auth, AI, Posts, etc.)
│   ├── utils/             # Helpers (OTP, JWT, Error Handling)
│   └── server.js          # Entry Point
├── frontend/              # React App
│   ├── src/
│   │   ├── components/    # Reusable UI (Navbar, Hero, etc.)
│   │   ├── pages/         # Main Views (Explore, Auth, PlanTrip, etc.)
│   │   └── assets/        # Images & Media
│   └── vite.config.js
└── README.md
```

## 📜 License
This project is for educational and portfolio purposes.

---
Made with ❤️ by the ExploreSpot Team.
