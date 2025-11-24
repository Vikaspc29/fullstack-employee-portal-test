# Full Stack Skill Test Project (Clean Structure)

This project is a small full-stack app built with:

- **Backend:** Node.js, Express, Apollo Server (GraphQL)
- **Frontend:** React, Vite, Apollo Client

It demonstrates:

- Authentication with JWT and two roles: `ADMIN` and `EMPLOYEE`
- GraphQL API for employees with pagination, sorting and filtering
- React UI with:
  - Hamburger menu (with one-level submenu)
  - Horizontal menu bar
  - Employee list in **Grid** view and **Tile** view
  - Detailed view for each employee in a modal
  - Role-based actions (Admin: Edit / Flag / Delete, Employee: Flag)

The folder structure is intentionally organised so it can scale:

- Backend: `src/graphql`, `src/auth`, `src/data`, `src/config`
- Frontend: `src/api`, `src/constants`, `src/hooks`, `src/components/...`

## How to run

### 1. Backend

```bash
cd backend
npm install
npm start
```

The GraphQL API will be available at: `http://localhost:4000/graphql`

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The React app will run (by default) at the Vite dev URL, e.g. `http://localhost:5173`.

> Make sure the backend is running before opening the frontend.

## Demo credentials

- **Admin**
  - Email: `admin@demo.com`
  - Password: `admin123`
- **Employee**
  - Email: `employee@demo.com`
  - Password: `employee123`
