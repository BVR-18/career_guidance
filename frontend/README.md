# CareerVerse — Frontend

A React 19 + TypeScript + Vite + Tailwind frontend for the CareerVerse AI career guidance platform, styled to match the provided design mockups (glassmorphism, rounded cards, Material Symbols icons, Plus Jakarta Sans / Inter type).

## Getting started

```bash
npm install
cp .env.example .env   # adjust VITE_API_BASE_URL if your backend runs elsewhere
npm run dev
```

The app expects your backend at `http://localhost:5000/api` (configurable via `VITE_API_BASE_URL`), with the routes described in your prompt (`/auth/*`, `/assessment/*`, `/careers`, `/roadmap/:careerId`, `/dashboard`, `/compare`, `/chat`).

## What's included

- **Auth**: JWT stored in `localStorage`, attached automatically via an Axios interceptor. A 401 response clears the session, shows a toast, and redirects to `/login` (handled in `src/api/axiosInstance.ts` + `src/context/AuthContext.tsx`).
- **Theming**: light/dark mode via a `ThemeContext` that toggles the `dark` class on `<html>`; all colors are CSS variables in `src/index.css` so both modes stay in sync with the mockups' color system.
- **Routing**: `src/routes/AppRoutes.tsx` — public marketing pages use `PublicLayout` (top nav), authenticated pages use `AppLayout` (sidebar + mobile bottom nav) behind `ProtectedRoute`.
- **State**: Context API only, as specified — `AuthContext`, `ThemeContext`, `DashboardContext`.
- **Data fetching**: one service file per API domain in `src/services/`, all going through the shared Axios instance — no hardcoded URLs in components.
- **Charts**: Chart.js via `react-chartjs-2` (`ProgressChart`, `PieChart`, `BarChart`) for the dashboard and assessment results.
- **Forms**: React Hook Form for Login/Register with inline validation.
- **Motion**: Framer Motion for page/element transitions, the assessment stepper, and the chat typing indicator.

## Still to do (noted, not stubbed silently)

- Wire up real career images (`Career.imageUrl`) once your backend returns them — currently cards render without a photo.
- The Roadmap page tracks step completion in `localStorage` per the "frontend only" spec — swap in a backend field if you later want it persisted server-side.
- No test suite is included; add Vitest + React Testing Library if you want coverage.

## Structure

```
src/
  api/            axios instance + interceptors
  components/
    common/       Loader, EmptyState, ErrorState, ProtectedRoute, Skeleton, ThemeToggle
    layout/       Navbar, Sidebar, MobileBottomNav, Footer, PublicLayout, AppLayout
    cards/        CareerCard, DashboardCard, AssessmentCard, ChatBubble, RoadmapStep
    charts/       ProgressChart, PieChart, BarChart
  context/        AuthContext, ThemeContext, DashboardContext
  hooks/          useDebounce, useLocalStorage
  pages/          Landing, Login, Register, Dashboard, Assessment, AssessmentResult,
                  Careers, CareerDetails, CareerComparison, Roadmap, Chat, Profile, NotFound
  routes/         AppRoutes
  services/       one file per backend domain
  types/          shared TS interfaces
  utils/          formatters
```
