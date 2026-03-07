# 🚀 Rulyn Backend — Complete Implementation Plan

> **This plan is built by auditing EVERY page and component in the frontend.**
> Every API endpoint below maps directly to real data used in the UI.
> The frontend currently runs on mock data (`USE_MOCK_DATA = true` in `src/lib/api.js`).
> This backend will replace ALL of that.

---

## 📌 Table of Contents

1. [Frontend Page Audit](#frontend-page-audit)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Database Schema](#database-schema)
5. [Complete API Endpoints](#complete-api-endpoints)
6. [Authentication Strategy](#authentication-strategy)
7. [Environment Variables](#environment-variables)
8. [Implementation Roadmap](#implementation-roadmap)
9. [Running Locally](#running-locally)

---

## 🗂 Frontend Page Audit

This section maps every page to the backend data it needs.

### Student Pages

| Page | Route | Data Needed from Backend |
|---|---|---|
| **StudentHome** | `/student` | Student profile (name, XP, level, streak, badges count), pending assignments (with story info), subject progress per student |
| **StoryList** | `/student/learn` | All stories (filtered by subject, difficulty, grade); student's completed stories |
| **StoryReader** | `/student/stories/:id` | Single story by ID (title, content array, quiz, XP); mark as read on finish |
| **QuizEngine** | `/student/quiz/:id` | Quiz questions for story ID; submit answers → receive score + XP |
| **AchievementsPage** | `/student/achievements` | All badge definitions + student's earned badges with dates + progress toward unearned badges; student XP, level, rank |
| **StudentProfile** | `/student/profile` | Full student profile (name, email, grade, XP, level, streak, joined date, completed stories/quizzes, badges) |
| **StudentSettings** | `/student/settings` | Get/update student preferences (theme, language, notifications) — stored per user |
| **LoginPage** | `/login` | Clerk-handled; backend syncs student on first login |
| **SignupPage** | `/signup` | Clerk-handled; backend creates student record via `POST /student/sync` |

### Teacher Pages

| Page | Route | Data Needed from Backend |
|---|---|---|
| **TeacherLogin** | `/teacher/login` | `POST /auth/teacher/login` → JWT |
| **TeacherDashboard** | `/teacher` | `GET /teacher/dashboard` → teacher name, analytics (conceptsMastered, averageEngagement, activeStudents), learningEnergy ring values (understanding, engagement, completion, participation); save language preference |
| **TeacherAnalytics** | `/teacher/analytics` | Stats: active students count, lessons completed, avg understanding %, avg learning time; energy streams per subject; weekly engagement array; concept mastery heat zones; AI insight text |
| **TeacherStudents** | `/teacher/students` | All students in teacher's classes: name, avatar, grade, xp, streak, storiesRead, quizzesTaken, avgScore, status, lastActive; per-student learning journey timeline (recent events) |
| **TeacherContentStudio** | `/teacher/content` | List of stories (for assignment selection); teacher's created content list (title, blocks count, status, engagement); create/save new story or quiz; assign content to class with due date |
| **TeacherSchedule** | `/teacher/schedule` | All scheduled events for teacher (lesson, quiz, live, deadline — title, date, time, duration, class, type); create/delete events |
| **TeacherMessages** | `/teacher/messages` | Conversations list (student, parent, group chats); messages in a conversation; send a message |
| **TeacherReports** | `/teacher/reports` | Class metrics (total students, avg score, completion rate, streak); top performers list; students needing support; concept mastery % per topic; recent activity timeline; export/print data |
| **TeacherSettings** | `/teacher/settings` | Get/update teacher profile (name, email, phone, school, subject); notification preferences; language preference; change password; active sessions |

---

## 🛠 Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Runtime | **Node.js v20+** | Matches the frontend ecosystem |
| Framework | **Express.js** | Lightweight, minimal, widely used |
| Database | **PostgreSQL** | Relational; perfect for students, teachers, scores |
| ORM | **Prisma** | Type-safe DB access, auto-migrations |
| Auth (Students) | **@clerk/backend** | Verify Clerk JWT from frontend |
| Auth (Teachers) | **jsonwebtoken + bcryptjs** | Custom login credential flow |
| Validation | **Zod** | Schema validation on all request bodies |
| File Uploads | **Multer** | Profile pictures (optional, Phase 2) |
| CORS | **cors** | Allow requests from `http://localhost:5173` |
| Env | **dotenv** | Secret management |

---

## 📁 Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma          # Full database schema
│   └── seed.js                # Seed all 6 stories, demo teacher + students
├── src/
│   ├── config/
│   │   └── db.js              # Prisma client singleton
│   ├── middleware/
│   │   ├── authStudent.js     # Verify Clerk JWT → req.studentId
│   │   ├── authTeacher.js     # Verify custom JWT → req.teacherId
│   │   └── validate.js        # Zod middleware wrapper
│   ├── routes/
│   │   ├── auth.js            # POST /auth/teacher/login
│   │   ├── students.js        # /student/* routes
│   │   ├── teachers.js        # /teacher/* routes
│   │   ├── stories.js         # /stories/* routes
│   │   ├── quizzes.js         # /quizzes/* routes
│   │   ├── assignments.js     # /assignments/* routes
│   │   ├── schedule.js        # /schedule/* routes
│   │   ├── messages.js        # /messages/* routes
│   │   └── analytics.js       # /analytics/* routes
│   ├── controllers/           # Business logic (one file per route)
│   ├── schemas/               # Zod schemas for each route
│   └── index.js               # App entry point, middleware setup
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🗄 Database Schema

### `teachers`
| Column | Type | Notes |
|---|---|---|
| `id` | Int (PK, autoincrement) | |
| `name` | String | |
| `email` | String (unique) | |
| `password_hash` | String | bcrypt |
| `subject` | String | |
| `school` | String | |
| `school_code` | String | |
| `phone` | String? | |
| `language_preference` | String (default: "english") | Saved from dashboard language switcher |
| `notifications` | Json | `{ studentActivity, quizCompletions, dailyDigest, parentMessages, systemUpdates }` |
| `created_at` | DateTime | |

### `students`
| Column | Type | Notes |
|---|---|---|
| `id` | String (PK) | Clerk User ID |
| `name` | String | |
| `email` | String (unique) | |
| `grade` | Int | |
| `class_id` | Int? (FK → classes) | |
| `xp` | Int (default: 0) | |
| `level` | Int (default: 1) | |
| `streak` | Int (default: 0) | |
| `last_active` | DateTime? | |
| `created_at` | DateTime | |

### `classes`
| Column | Type | Notes |
|---|---|---|
| `id` | Int (PK, autoincrement) | |
| `name` | String | e.g. "Grade 8 Science" |
| `teacher_id` | Int (FK → teachers) | |
| `school_code` | String | |
| `created_at` | DateTime | |

### `stories`
| Column | Type | Notes |
|---|---|---|
| `id` | Int (PK, autoincrement) | |
| `title` | String | |
| `topic` | String | |
| `subject` | String | Science, Math, Technology, Engineering |
| `description` | String | |
| `cover_image` | String | Emoji or URL |
| `grade_range` | String | e.g. "Grade 3-5" |
| `difficulty` | String | Easy / Medium / Hard |
| `read_time` | String | e.g. "5 min" |
| `xp` | Int | XP reward for reading |
| `content` | Json | `[{ image: "☀️", text: "..." }, ...]` |
| `quiz` | Json | `[{ question, options[], correct }, ...]` |
| `created_by` | Int? (FK → teachers) | null = built-in story |
| `status` | String (default: "published") | published / draft |
| `created_at` | DateTime | |

### `story_progress`
| Column | Type | Notes |
|---|---|---|
| `id` | Int (PK, autoincrement) | |
| `story_id` | Int (FK → stories) | |
| `student_id` | String (FK → students) | |
| `completed` | Boolean (default: false) | |
| `progress_pct` | Int (default: 0) | 0–100 |
| `completed_at` | DateTime? | |

### `quiz_submissions`
| Column | Type | Notes |
|---|---|---|
| `id` | Int (PK, autoincrement) | |
| `story_id` | Int (FK → stories) | quiz belongs to a story |
| `student_id` | String (FK → students) | |
| `score` | Int | Correct answers |
| `max_score` | Int | Total questions |
| `percentage` | Float | |
| `xp_earned` | Int | |
| `answers` | Json | Student's chosen answers |
| `submitted_at` | DateTime | |

### `badges`
| Column | Type | Notes |
|---|---|---|
| `id` | Int (PK, autoincrement) | |
| `student_id` | String (FK → students) | |
| `badge_key` | String | first_steps, science_whiz, streak_master, quiz_champ, speed_demon, knowledge_seeker, perfect_week, math_master |
| `earned_at` | DateTime | |

### `badge_progress`
| Column | Type | Notes |
|---|---|---|
| `id` | Int (PK, autoincrement) | |
| `student_id` | String (FK → students) | |
| `badge_key` | String | |
| `progress` | Int | Current count toward badge |
| `total` | Int | Target count to unlock |

### `assignments`
| Column | Type | Notes |
|---|---|---|
| `id` | Int (PK, autoincrement) | |
| `title` | String | |
| `description` | String | |
| `type` | String | quiz / story / story+quiz |
| `story_id` | Int? (FK → stories) | |
| `teacher_id` | Int (FK → teachers) | |
| `class_id` | Int (FK → classes) | |
| `due_date` | DateTime | |
| `assigned_date` | DateTime | |
| `points` | Int | |
| `status` | String | active / completed / overdue |
| `created_at` | DateTime | |

### `assignment_completions`
| Column | Type | Notes |
|---|---|---|
| `id` | Int (PK, autoincrement) | |
| `assignment_id` | Int (FK → assignments) | |
| `student_id` | String (FK → students) | |
| `completed_at` | DateTime | |

### `schedule_events`
| Column | Type | Notes |
|---|---|---|
| `id` | Int (PK, autoincrement) | |
| `teacher_id` | Int (FK → teachers) | |
| `title` | String | |
| `type` | String | lesson / quiz / live / deadline |
| `date` | String | YYYY-MM-DD |
| `time` | String | HH:MM AM/PM |
| `duration` | String | "45 min" |
| `class_name` | String | |
| `color` | String | Tailwind gradient class |
| `created_at` | DateTime | |

### `messages`
| Column | Type | Notes |
|---|---|---|
| `id` | Int (PK, autoincrement) | |
| `conversation_id` | Int (FK → conversations) | |
| `sender_type` | String | teacher / student / parent |
| `sender_id` | String | teacher ID or student ID |
| `text` | String | |
| `sent_at` | DateTime | |

### `conversations`
| Column | Type | Notes |
|---|---|---|
| `id` | Int (PK, autoincrement) | |
| `teacher_id` | Int (FK → teachers) | |
| `type` | String | student / parent / group |
| `participant_id` | String? | student.id or parent contact |
| `participant_name` | String | |
| `participant_avatar` | String | Emoji |
| `is_group` | Boolean | |
| `group_size` | Int? | |
| `created_at` | DateTime | |

### `student_settings`
| Column | Type | Notes |
|---|---|---|
| `id` | Int (PK, autoincrement) | |
| `student_id` | String (FK → students, unique) | |
| `theme` | String (default: "light") | light / dark / system |
| `language` | String (default: "english") | |
| `notifications` | Json | Per-type on/off flags |

---

## 🌐 Complete API Endpoints

Base URL: `http://localhost:3000/api`

---

### 🔑 Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/teacher/login` | None | Login with email + password → JWT |
| `POST` | `/auth/teacher/logout` | Teacher JWT | Sign out (client drops token) |
| `POST` | `/auth/teacher/change-password` | Teacher JWT | Update password (bcrypt) |

**Login Request:**
```json
{ "email": "sharma@school.edu", "password": "password123" }
```
**Login Response:**
```json
{
  "token": "<jwt>",
  "teacher": { "id": 1, "name": "Dr. Sharma", "email": "...", "subject": "Science", "school": "RULYN Academy" }
}
```

---

### 👩‍🎓 Student (`/student/*` — Clerk JWT required)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/student/sync` | Create/upsert student on Clerk login (**called once on first login**) |
| `GET` | `/student/profile` | Full profile: name, email, grade, XP, level, streak, completedStories[], completedQuizzes[], badges[], dailyProgress, pendingAssignments |
| `PUT` | `/student/profile` | Update name / grade |
| `POST` | `/student/progress` | Update XP, streak, mark story as read, daily progress (used by offline sync queue too) |
| `GET` | `/student/assignments` | All assignments for student's class (pending + completed) |
| `POST` | `/student/assignments/:id/complete` | Mark an assignment as done |
| `GET` | `/student/badges` | All available badge definitions + which ones the student earned + progress on locked badges |
| `GET` | `/student/settings` | Get student settings (theme, language, notifications) |
| `PUT` | `/student/settings` | Update student settings |
| `GET` | `/student/achievements` | Detailed achievement page data: stats (XP, level, rank, badges earned/total) + all badge data with progress |

**`GET /student/profile` Response:**
```json
{
  "id": "user_abc",
  "name": "Explorer",
  "email": "student@rulyn.edu",
  "grade": 8,
  "xp": 3420,
  "level": 12,
  "streak": 12,
  "completedStories": [1],
  "completedQuizzes": [1],
  "badges": ["first_steps", "science_whiz", "streak_master"],
  "dailyProgress": { "storiesCompleted": 2, "quizzesTaken": 1, "minutesLearned": 12 },
  "assignments": { "pending": [2, 3], "completed": [1] }
}
```

**`GET /student/achievements` Response:**
```json
{
  "stats": { "totalXP": 3420, "level": 12, "nextLevelXP": 4000, "badgesEarned": 3, "totalBadges": 8, "rank": "Explorer III" },
  "badges": [
    { "id": "first_steps", "name": "First Steps", "desc": "...", "icon": "🌱", "earned": true, "rarity": "common", "xpReward": 50, "earnedDate": "Jan 5, 2026" },
    { "id": "quiz_champ", "name": "Quiz Champion", "desc": "...", "icon": "🏆", "earned": false, "rarity": "legendary", "xpReward": 500, "progress": 7, "total": 10 }
  ]
}
```

---

### 📖 Stories (`/stories/*`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/stories` | Student or Teacher | List all stories. Query params: `?subject=Science`, `?difficulty=Easy`, `?grade=Grade+3-5` |
| `GET` | `/stories/:id` | Student or Teacher | Get one story with full content + quiz questions |
| `POST` | `/stories` | Teacher | Create a new story (title, content blocks, quiz, difficulty, subject, grade, xp) |
| `PUT` | `/stories/:id` | Teacher | Update a story |
| `DELETE` | `/stories/:id` | Teacher | Delete a story (only teacher-created ones) |

**`GET /stories` Response:**
```json
[
  {
    "id": 1, "title": "How Plants Make Food", "topic": "Photosynthesis",
    "subject": "Science", "description": "...", "coverImage": "🌱",
    "grade": "Grade 3-5", "difficulty": "Easy", "readTime": "5 min", "xp": 50
  }
]
```

---

### 🧠 Quizzes (`/quizzes/*`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/quizzes/:storyId/submit` | Student | Submit quiz answers → returns score, XP earned, pass/fail. Also updates student XP and progress |

**Submit Request:**
```json
{ "answers": [1, 2, 0, 2, 1] }
```
**Submit Response:**
```json
{ "score": 4, "maxScore": 5, "percentage": 80, "xpEarned": 40, "passed": true, "newTotalXP": 3460 }
```

---

### 📋 Assignments (`/assignments/*`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/assignments` | Teacher | Get all assignments created by this teacher |
| `POST` | `/assignments` | Teacher | Create a new assignment (title, description, type, storyId, classId, dueDate, points) |
| `PUT` | `/assignments/:id` | Teacher | Edit an assignment |
| `DELETE` | `/assignments/:id` | Teacher | Delete an assignment |
| `GET` | `/assignments/class/:classId` | Student | Get assignments for a class (used in StudentHome) |

---

### 🗓 Schedule (`/schedule/*`)

> Maps directly to **TeacherSchedule** page. All events stored in DB per teacher.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/schedule` | Teacher | Get all events for the authenticated teacher |
| `POST` | `/schedule` | Teacher | Create a new event (title, type, date, time, duration, class) |
| `PUT` | `/schedule/:id` | Teacher | Update an event |
| `DELETE` | `/schedule/:id` | Teacher | Delete an event |

**Event types:** `lesson`, `quiz`, `live`, `deadline`

---

### 💬 Messages (`/messages/*`)

> Maps directly to **TeacherMessages** page (conversations + chat).

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/messages/conversations` | Teacher | List all conversations (student, parent, group) with last message + unread count |
| `GET` | `/messages/conversations/:id` | Teacher | Get all messages in a conversation |
| `POST` | `/messages/conversations/:id/send` | Teacher | Send a message in a conversation |
| `PATCH` | `/messages/conversations/:id/read` | Teacher | Mark messages in a conversation as read |

---

### 🏫 Teacher (`/teacher/*`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/teacher/profile` | Teacher | Get teacher profile + stats (totalStudents, assignmentsCreated, avgClassScore) |
| `PUT` | `/teacher/profile` | Teacher | Update name, email, phone, school, subject |
| `GET` | `/teacher/dashboard` | Teacher | **Dashboard data bundle**: teacher profile + analytics rings (understanding, engagement, completion, participation) + activeStudents count + conceptsMastered + averageEngagement |
| `GET` | `/teacher/students` | Teacher | All students in teacher's classes with: name, avatar, grade, xp, streak, storiesRead, quizzesTaken, avgScore, status (active/rising/needs-support/inactive), lastActive |
| `GET` | `/teacher/students/:id/journey` | Teacher | A specific student's recent learning timeline (last 10 events: stories read, quizzes taken, milestones, streaks) |
| `GET` | `/teacher/classes` | Teacher | List teacher's classes |
| `POST` | `/teacher/classes` | Teacher | Create a new class |
| `PUT` | `/teacher/settings` | Teacher | Update teacher settings (notifications JSON, language, theme) |
| `POST` | `/teacher/settings/language` | Teacher | Update just the language preference (matches `handleLanguageChange` in TeacherDashboard) |

**`GET /teacher/dashboard` Response:**
```json
{
  "teacher": { "id": 1, "name": "Dr. Sharma", "email": "...", "subject": "Science", "school": "RULYN Academy", "languageProfile": { "primary": "english" } },
  "analytics": {
    "activeStudents": 6,
    "conceptsMastered": 12,
    "averageEngagement": 87,
    "learningEnergy": { "understanding": 80, "engagement": 90, "completion": 70, "participation": 85 }
  },
  "messages": []
}
```

---

### 📊 Analytics (`/analytics/*`)

> Powers **TeacherAnalytics** and **TeacherReports** pages.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/analytics/overview` | Teacher | Stats: activeStudents, lessonsCompleted, avgUnderstanding, avgLearningTime, changes vs previous period |
| `GET` | `/analytics/engagement` | Teacher | Weekly engagement pulse array `[65, 72, ...]` |
| `GET` | `/analytics/energy-streams` | Teacher | Per-subject scores: `[{ label, value, color }]` for Science, Math, Reading, Quiz Performance |
| `GET` | `/analytics/concepts` | Teacher | Concept mastery heat zones: `[{ name, understanding, zones[], students }]` |
| `GET` | `/analytics/reports` | Teacher | Class-level report metrics + top performers list + students needing support list + recent activity timeline |
| `GET` | `/analytics/reports/export` | Teacher | Generate a downloadable report (CSV or PDF summary) |

---

## 🔐 Authentication Strategy

### Student Flow (Clerk)
1. Student signs in via Clerk on the frontend.
2. Frontend gets token: `window.Clerk.session.getToken()` → sends as `Authorization: Bearer <token>`
3. On **first login**, frontend calls `POST /student/sync` to create the DB record.
4. Backend middleware (`authStudent.js`) uses `@clerk/backend` to verify the token → attaches `req.studentId`.

### Teacher Flow (Custom JWT)
1. Teacher submits credentials to `POST /auth/teacher/login`.
2. Backend validates with bcrypt, signs a JWT (7-day expiry), returns it.
3. Frontend stores the JWT in `localStorage`, sends with every teacher API request.
4. Backend middleware (`authTeacher.js`) verifies JWT → attaches `req.teacherId`.

> **Note:** `TeacherDashboard.jsx` and `TeacherSettings.jsx` already call `http://localhost:3000/api/teacher/...` directly — this confirms the base URL.

---

## ⚙️ Environment Variables

Create a `.env` file in `backend/`:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/rulyn_db"

# Clerk (for student token verification)
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxx

# JWT (for teacher auth)
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:5173
```

---

## 🗺 Implementation Roadmap

### ✅ Phase 1 — Project Setup
- [ ] `npm init`, install: `express prisma @prisma/client @clerk/backend jsonwebtoken bcryptjs zod cors dotenv`
- [ ] Dev deps: `nodemon`
- [ ] Create `src/index.js` with Express, cors, json middleware, route mounts
- [ ] `npx prisma init` → configure `DATABASE_URL`
- [ ] Write `prisma/schema.prisma` with all tables above
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Write `prisma/seed.js`:
  - 6 built-in stories from `mockData.js`
  - 1 demo teacher: `Dr. Sharma` / `sharma@school.edu` / password: `rulyn2026`
  - 1 class: "Grade 8 Science"
  - 8 demo students from `mockClassStudents`
  - 3 demo assignments from `mockAssignments`
  - 4 schedule events from `TeacherSchedule` mock data
  - 5 demo conversations

### ✅ Phase 2 — Auth
- [ ] `POST /auth/teacher/login` (bcrypt + JWT sign)
- [ ] `middleware/authStudent.js` (Clerk JWT verify)
- [ ] `middleware/authTeacher.js` (custom JWT verify)
- [ ] `POST /auth/teacher/change-password`

### ✅ Phase 3 — Student Core APIs
- [ ] `POST /student/sync` — upsert on Clerk login
- [ ] `GET /student/profile` — full profile with assignments, badges, daily progress
- [ ] `PUT /student/profile`
- [ ] `POST /student/progress` — XP update, streak, story/quiz tracking
- [ ] `GET /student/achievements` — all 8 badge defs + earned + progress
- [ ] `GET /student/settings` + `PUT /student/settings`

### ✅ Phase 4 — Stories & Quizzes
- [ ] `GET /stories` with filters (subject, difficulty, grade)
- [ ] `GET /stories/:id` (with full content + quiz)
- [ ] `POST /quizzes/:storyId/submit` — score, XP, update student record
- [ ] Auto-award badges on thresholds (e.g., first story → `first_steps`)

### ✅ Phase 5 — Assignments
- [ ] Teacher CRUD: `GET/POST/PUT/DELETE /assignments`
- [ ] Student: `GET /assignments/class/:classId` (pending/completed split)
- [ ] Student: `POST /assignments/:id/complete`

### ✅ Phase 6 — Teacher Dashboard + Profile
- [ ] `GET /teacher/dashboard` — data bundle (teacher + analytics rings + active students)
- [ ] `GET /teacher/profile` + `PUT /teacher/profile`
- [ ] `GET /teacher/students` — class roster with stats
- [ ] `GET /teacher/students/:id/journey` — learning timeline
- [ ] `GET /teacher/classes` + `POST /teacher/classes`
- [ ] `PUT /teacher/settings` + `POST /teacher/settings/language`

### ✅ Phase 7 — Content Studio (Teacher)
- [ ] `POST /stories` — teacher creates a new story
- [ ] `PUT /stories/:id`, `DELETE /stories/:id`
- [ ] Teacher's content list with status + engagement rate

### ✅ Phase 8 — Schedule
- [ ] `GET /schedule` — teacher's events
- [ ] `POST /schedule` — create event
- [ ] `PUT /schedule/:id`, `DELETE /schedule/:id`

### ✅ Phase 9 — Messages
- [ ] `GET /messages/conversations`
- [ ] `GET /messages/conversations/:id`
- [ ] `POST /messages/conversations/:id/send`
- [ ] `PATCH /messages/conversations/:id/read`

### ✅ Phase 10 — Analytics + Reports
- [ ] `GET /analytics/overview` — 4 stat cards
- [ ] `GET /analytics/engagement` — weekly pulse data
- [ ] `GET /analytics/energy-streams` — per-subject bars
- [ ] `GET /analytics/concepts` — heat zones
- [ ] `GET /analytics/reports` — complete report data
- [ ] `GET /analytics/reports/export` — CSV download

### ✅ Phase 11 — Polish & Frontend Integration
- [ ] Consistent error format: `{ error: "message", code: "ERROR_KEY" }`
- [ ] Correct HTTP status codes (400, 401, 403, 404, 500)
- [ ] Zod validation middleware on all POST/PUT routes
- [ ] **Frontend**: Set `USE_MOCK_DATA = false` in `src/lib/api.js`
- [ ] **Frontend**: Add `VITE_API_URL=http://localhost:3000/api` to `frontend/.env`
- [ ] Verify all pages load real data end-to-end

---

## ▶️ Running Locally

```bash
# 1. Go to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Set up your .env (copy and fill values)
cp .env.example .env

# 4. Run database migrations
npx prisma migrate dev

# 5. Seed with initial data (stories, teacher, students)
npx prisma db seed

# 6. Start the development server
npm run dev
# → API running at http://localhost:3000
```

**Run both services simultaneously (in separate terminals):**

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

---

## 🔌 Frontend Integration Checklist

Once the backend is live, do these two things in the frontend:

```js
// frontend/src/lib/api.js — Line 6
const USE_MOCK_DATA = false; // ← Change this

// frontend/.env — Add this line
VITE_API_URL=http://localhost:3000/api
```

> **Offline Sync:** The `syncManager` in `src/lib/sync.js` queues `UPDATE_PROGRESS` actions when offline and flushes them automatically when the user comes back online. This works with `POST /student/progress`.

---

## 📝 Key Notes

1. **`TeacherDashboard.jsx` already calls the real URL** (`http://localhost:3000/api/teacher/dashboard`). All other teacher pages use mock data. The backend will serve all of them.
2. **Badge awarding is automatic** — when a student submits a quiz or reads a story, the backend checks badge conditions and awards them (e.g., first story → `first_steps` badge; 10+ quiz score → `quiz_champ` progress).
3. **Subject progress** on StudentHome (Science 65%, Math 80%, etc.) is computed from the student's `story_progress` records grouped by subject.
4. **Daily challenges** (StudentHome) reset at midnight — these will be computed dynamically based on today's date and student progress.
5. **TeacherReports Export** — the `/analytics/reports/export` endpoint returns a CSV with all class student data.
