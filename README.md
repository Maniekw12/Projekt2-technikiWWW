# Forum Application

Full-stack discussion platform built with Node.js, Express, and PostgreSQL.

## Prerequisites

* Node.js (v14 or higher)
* PostgreSQL database
* npm (Node Package Manager)

## Project Structure

* `/backend` - API server, database logic, and authentication.
* `/frontend` - Client-side static files and dedicated Express server.

## Installation

1. **Clone the repository** and enter the project directory.

2. **Install Backend dependencies**:
```bash
   cd backend
   npm install
```

3. **Install Frontend dependencies**:
```bash
   cd ../frontend
   npm install
```

## Database Configuration

Before starting the server, ensure you have a PostgreSQL database named `users_data_base`. Update the credentials in `backend/db/db.js`:
```javascript
const pool = new Pool({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'users_data_base',
    port: 5432,
});
```

## Running the Application

You need to run two separate processes for the app to function correctly.

### 1. Start Backend (API)
The first thing you have to do is run Docker
and run command:

```bash
  docker-compose up
```

The backend handles database operations and authentication.
```bash
  cd backend
  npm run dev
```

Server runs on: http://localhost:3000
Database runs on: http://localhost:5432

### 2. Start Frontend (Static Server)

The frontend serves the HTML/CSS/JS files.
```bash
  cd frontend
  node server.js
```

Application UI available at: http://localhost:5500

## API Endpoints Reference

### Users & Auth

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/users/register` | Create a new account | No |
| POST | `/api/users/login` | Login and get JWT token | No |
| GET | `/api/users/me/profile` | Get logged-in user data | Yes |

### Posts

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/posts` | List all posts | No |
| POST | `/api/posts` | Create a new post | Yes |
| PUT | `/api/posts/:id` | Update your post | Yes |
| DELETE | `/api/posts/:id` | Remove your post | Yes |

### Comments

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/comments/post/:postId` | List comments for a post | No |
| POST | `/api/comments` | Add a new comment | Yes |
| DELETE | `/api/comments/:id` | Delete your comment | Yes |

## Technology Stack

* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (pg-pool)
* **Auth:** JSON Web Tokens (JWT), Bcrypt
* **Frontend:** Vanilla JS, HTML5, CSS3