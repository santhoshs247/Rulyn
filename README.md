# 🎓 Rulyn — Modern Educational Platform

Rulyn is a next-generation educational platform designed to gamify learning for students and provide powerful analytics and content management tools for teachers. It features a rich, interactive frontend built with React and a robust backend powered by Node.js and MySQL.


---

## 🏛 Project Architecture

Rulyn is split into two primary components:

*   **[`/frontend`](./frontend)**: A React-based web application with dedicated portals for students and teachers. Uses **Clerk** for student authentication and **Three.js** for interactive 3D elements.
*   **[`/backend`](./backend)**: A Node.js Express API that handles data persistence via **Prisma ORM** and **MySQL**. It manages student syncing, quiz submissions, teacher analytics, and messaging.


---

## ✨ Key Features

### 👩‍🎓 For Students
*   **Interactive Story Reader**: Gamified reading experience with subject-based content.
*   **Quiz Engine**: Test knowledge after reading and earn XP and badges.
*   **Achievements & Progression**: Level up, earn badges, and track streaks.
*   **Subject Progress**: Visual tracking of mastery in Science, Math, and more.
*   **Student Profile**: Personalized dashboard with XP, level, and accomplishments.

### 👨‍🏫 For Teachers
*   **Real-time Analytics**: Insights into student engagement, understanding, and performance.
*   **Content Studio**: Create and assign stories and quizzes to classes.
*   **Student Journey**: Track individual student milestones and learning timelines.
*   **Class Management**: Organize students into classes and view roster metrics.
*   **Communication**: Integrated messaging system for students and parents.
*   **Scheduler**: Manage lesson plans, deadlines, and live sessions.

---

## 🛠 Tech Stack

| Layer | Frontend (`/frontend`) | Backend (`/backend`) |
| :--- | :--- | :--- |
| **Language** | TypeScript / JavaScript | JavaScript |
| **Framework** | React (Vite) | Express.js |
| **State/Data** | TanStack Query | Prisma ORM |
| **Styling** | Tailwind CSS / Framer Motion | — |
| **Auth** | Clerk (Students) / JWT (Teachers) | Clerk SDK / JWT / bcrypt |
| **Database** | — | MySQL |

| **Visuals** | Three.js / Lucide Icons | — |

---

## 🚀 Getting Started

To run the full project locally, you will need to start both the frontend and backend services.

### 1. Prerequisites
*   Node.js (v20+)
*   MySQL database

*   Clerk Account (for Student Auth)

### 2. Backend Setup
```bash
cd backend
npm install
# Copy .env.example to .env and fill in your DATABASE_URL and CLERK_SECRET_KEY
npx prisma migrate dev
npx prisma db seed
npm run dev
# Server runs at http://localhost:3000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
# Copy .env.example to .env and fill in VITE_CLERK_PUBLISHABLE_KEY
npm run dev
# App runs at http://localhost:5173
```

---

## 📁 Project Structure

```text
Rulyn/
├── backend/               # Express API & Database
│   ├── prisma/            # Schema, migrations, and seed data
│   ├── src/               # API routes, controllers, and middleware
│   └── package.json
├── frontend/              # React Application
│   ├── src/
│   │   ├── pages/         # Student & Teacher portal pages
│   │   ├── components/    # Shared UI & Layout components
│   │   ├── lib/           # API clients and utilities
│   │   └── contexts/      # Theme, Language, and Settings state
│   └── package.json
└── README.md              # Unified project documentation
```

---

## 📝 Environment Configuration

Each directory requires its own `.env` file. Refer to the respective `README.md` files for detailed variable requirements.

*   **Backend**: `backend/README.md`
*   **Frontend**: `frontend/README.md`

---

## 📞 Support & Integration

The frontend communication layer is managed in `frontend/src/lib/api.js`. To switch from mock data to the real backend API:
1.  Set `USE_MOCK_DATA = false` in `src/lib/api.js`.
2.  Ensure `VITE_API_URL` is set to your backend address in `frontend/.env`.

---

*Built with ❤️ for the future of education.*
