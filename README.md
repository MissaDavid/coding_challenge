# Todo App - Coding Challenge

This app allows a User to create an account, log in, and manage their todos.
You can create new tasks, update them, mark them as completed or delete them.

Is it overkill for a coding challenge? Absolutely.

## Technologies Used

### Backend
- **Django** + **Django REST Framework**
- **PostgreSQL** database (via Docker)
- **Docker** + **Docker Compose**

### Frontend
- **Vite** + **React** + **TypeScript**:
- **Tailwind CSS** and **Shadcn UI** (thank you open source!)

## Requirements

### Backend (if running without Docker)
- Python 3.8+ 
- Poetry

### Frontend
- Node.js 16+
- npm 7+

## Running the Application

### Backend (Docker)

1. Build and start the Docker containers (backend + db):
   ```bash
   docker-compose up -d
   ```

3. The backend API will be available at `http://localhost:8000/api`

### Frontend (npm)

1. Navigate to the frontend directory:
   ```bash
   cd todo-app
   ```

2. Install dependencies and start the development server:
   ```bash
   npm i && npm run dev
   ```

3. The frontend application will be available at `http://localhost:5173`
4. Login and Registration are available at `http://localhost:5173/signin`, and dashboard available at `http://localhost:5173/home`.





