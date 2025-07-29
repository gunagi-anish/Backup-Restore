# Book Management System with MySQL Backup and Restore

## Project Overview

This is a Node.js and Express-based backend application for managing books, authors, and categories. It supports full CRUD operations and includes a secure backup and restore system for the MySQL database. Automated backups are scheduled using node-cron, and old backups are removed automatically to manage storage.

## Features

* RESTful CRUD APIs for books, authors, and categories
* Manual and automatic MySQL database backup
* Restore database from uploaded backup file
* JWT-based authentication for admin access
* Backup log management
* Auto-deletion of backups older than 7 days

## Technologies Used

* Node.js
* Express.js
* MySQL
* mysqldump (via NPM)
* node-cron
* multer
* dotenv
* mysql2

## Prerequisites

* Node.js installed
* MySQL server running
* Create a MySQL database manually

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Configuration

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=bookdb
JWT_SECRET=your_jwt_secret
```

### 4. Import Database Schema

Import the initial schema using a `.sql` file or use the manual backup file provided to create tables and sample data.

### 5. Run the Application

```bash
node app.js
```

The server will start on the configured port (default is 5000).

## API Endpoints

### Books

* `GET /api/books`
* `POST /api/books`
* `PUT /api/books/:id`
* `DELETE /api/books/:id`

### Backup and Restore

#### Backup

* **Method:** `GET`
* **Endpoint:** `/api/backup`
* **Headers:**

  * `Authorization: Bearer <your_admin_token>`
* **Steps in Postman:**

  1. Create a new GET request to `http://localhost:5000/api/backup` (or deployed URL)
  2. In the Headers tab, add:

     * Key: `Authorization`
     * Value: `Bearer <your_admin_token>`
  3. Click "Send"
  4. You will receive a downloadable `.sql` file

#### Restore

* **Method:** `POST`
* **Endpoint:** `/api/restore`
* **Headers:**

  * `Authorization: Bearer <your_admin_token>`
* **Body:** `form-data`

  * Key: `backupFile` (type: File)
  * Value: Choose a `.sql` file
* **Steps in Postman:**

  1. Create a new POST request to `http://localhost:5000/api/restore` (or deployed URL)
  2. In the Headers tab, add:

     * Key: `Authorization`
     * Value: `Bearer <your_admin_token>`
  3. In the Body tab, select `form-data`

     * Key: `backupFile`, type: File, upload your `.sql` backup file
  4. Click "Send"
  5. On success, response will be: `Database restored.`

## Automated Backup

* Scheduled every 15 minutes using node-cron
* Backup files stored in `/backups`
* Backups older than 7 days are deleted automatically

## Logs

* Backup and cleanup activities are logged in `/logs/backup.log`

## Deployment Notes

* Works on Render or similar Node.js-supported platforms
* Be aware of ephemeral file system limitations on hosting platforms
* Deployed the serevr at https://bookmanagement-sc3n.onrender.com
