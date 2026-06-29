# Synapse

Synapse is a full-stack personal knowledge management application designed to help users organize, search, and manage their notes efficiently. It provides secure authentication, intelligent note organization, folder management, advanced search, filtering, and bulk operations through a scalable REST API.

> **Project Status:** Backend Complete (Version 1.0) | Frontend Under Development

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### Notes Management

* Create, Read, Update and Delete Notes
* Soft Delete & Restore
* Search Notes
* Pagination
* Tags
* Favorites
* Archive Notes
* Advanced Filtering
* Dynamic Sorting
* Bulk Archive
* Bulk Favorite / Unfavorite

### Folder Management

* Create Folder
* Rename Folder
* Delete Folder
* Move Notes Between Folders
* Folder Statistics

### API Features

* Swagger Documentation
* Input Validation
* Global Exception Handling
* Logging Interceptor
* PostgreSQL Database
* TypeORM ORM

---

## Tech Stack

### Backend

* NestJS
* TypeScript
* PostgreSQL
* TypeORM
* Passport JWT
* Swagger
* class-validator
* bcrypt

### Frontend

* React *(In Development)*

---

## Project Structure

```
Synapse
│
├── server
│   ├── src
│   ├── package.json
│   └── ...
│
├── client
│   └── (Frontend)
│
└── README.md
```

---

## Backend Setup

```bash
git clone <repository-url>

cd Synapse/server

npm install

cp .env.example .env

npm run start:dev
```

---

## Environment Variables

Create a `.env` file inside the `server` directory.

Example:

```env
PORT=3000

DB_HOST=
DB_PORT=5432
DB_USERNAME=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=
JWT_EXPIRATION=1d
```

---

## API Documentation

After running the backend, Swagger is available at:

```
http://localhost:3000/api
```

---

## Current Status

* Backend Development Completed
* Frontend Development In Progress
* Backend–Frontend Integration Pending

---

## Future Improvements

* Real-time collaboration
* File attachments
* Markdown editor
* Rich text editing
* Notifications
* AI-powered note organization
* Cloud deployment

---

## License

This project is developed for learning and portfolio purposes.
