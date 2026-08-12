# CareerVerse – Unified Multi-Category Career Guidance Platform

CareerVerse is an AI-powered Career Guidance Platform supporting students across three distinct education levels:
1. **10th Class Students** (`TENTH`): Helping students decide what stream to choose after 10th (MPC, BiPC, MEC, CEC, Polytechnic, ITI) with Andhra Pradesh educational context.
2. **Intermediate Students** (`INTERMEDIATE`): Helping students decide what to do after Intermediate (What is BTech, BTech branches, AP EAPCET pathway, BSc/BCom/BA/BBA/BCA 3-year degrees, CA/CMA/CS, Law, Healthcare, Govt Jobs, Defence).
3. **BTech Students** (`BTECH`): Helping BTech students achieve job readiness with branch-to-role mappings, DSA/coding, projects, resume building, interview prep, and milestone roadmaps.

---

## 🔑 Demo Login Accounts

Test the three student category experiences directly on the Login page using the one-click **"Use Demo Login"** buttons or the credentials below:

### 1. 10th Class Student Demo
- **Email**: `tenth.demo@careerverse.com`
- **Password**: `Demo@123`
- **Education Level**: `TENTH`
- **Dashboard**: `/tenth/dashboard`
- **Focus**: Post-10th stream choices (MPC, BiPC, MEC, CEC, Polytechnic Diploma lateral entry, ITI)

### 2. Intermediate Student Demo
- **Email**: `inter.demo@careerverse.com`
- **Password**: `Demo@123`
- **Education Level**: `INTERMEDIATE`
- **Dashboard**: `/intermediate/dashboard`
- **Focus**: Post-Intermediate pathways (What is BTech, AP EAPCET, BTech engineering branches vs BSc/BCom/BA/BBA/BCA degrees, CA/CS, Law, Govt jobs)

### 3. BTech Engineering Student Demo
- **Email**: `btech.demo@careerverse.com`
- **Password**: `Demo@123`
- **Education Level**: `BTECH`
- **Dashboard**: `/btech/dashboard`
- **Focus**: Engineering job roles (CSE, ECE, EEE, Mech, Civil, Biotech, Aerospace), DSA/Coding, Projects, Resume, Interview prep, Roadmap save/done milestone tracking.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router v6, React Hook Form, Chart.js.
- **Backend**: Node.js, Express.js, MongoDB Atlas (Mongoose), JWT Authentication, Bcrypt.js.
- **AI Engine**: Google Gemini AI (`@google/genai`).

---

## 🚀 Setup & Execution

### 1. Backend Setup
```bash
cd backend
npm install
node src/utils/seedData.js   # Seeds demo accounts and 26 careers spanning all B.Tech branches
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🎯 Unified Student Journey

```text
10th Class Student
  ↓ Choose post-10th stream (MPC, BiPC, MEC, CEC, Polytechnic, ITI)
Intermediate Student
  ↓ Choose BTech Engineering / 3-Year Degree / Professional CA-Law / Govt Services
BTech Student
  ↓ Prepare for Job Roles (DSA, Web Dev, Core Engineering, Projects, Resume)
Industry Placement & Career Success
```
