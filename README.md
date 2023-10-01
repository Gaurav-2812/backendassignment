# Task Management Backend

This is the backend server for a task management application. It provides API endpoints for creating, retrieving, updating, and deleting tasks.

## Getting Started

These instructions will help you set up and run the server on your local machine.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- MongoDB server up and running, or a MongoDB Atlas cluster URL.

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/Gaurav-2812/backendassignment.git
   ```
2. Install the dependencies:
   ```shell
   npm install
   ```
3. Update the MongoURL in app.js with your MongoDB Atlas cluster URL or your local MongoDB URL:

   ```shell
   const MongoURL = 'your_mongodb_url'; // Add your atlas cluster url or Local MongoDB url here
   ```
4. Start the server by running:
   ```shell
   node app.js
   ```
5. The server will start running on the specified port (default is 4000). You can access the API at http://localhost:4000.

# Task Management API

## API Endpoints

- **POST /tasks**: Create a new task.
- **GET /tasks**: Retrieve all tasks.
- **GET /tasks/completed**: Retrieve completed tasks.
- **GET /tasks/incomplete**: Retrieve incomplete tasks.
- **PUT /tasks/:id**: Update a task by ID.
- **PUT /tasks/complete/:id**: Mark a task as complete.
- **PUT /tasks/incomplete/:id**: Mark a task as incomplete.
- **DELETE /tasks/:id**: Delete a task by ID.

## Built With

- Express.js - Web framework for Node.js
- MongoDB - Database for storing task data
- Mongoose - MongoDB object modeling tool
- Cors - Middleware for enabling Cross-Origin Resource Sharing (CORS)

## Author

Gaurav Kumar

