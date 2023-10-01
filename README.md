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
2. Update the MongoURL in app.js with your MongoDB Atlas cluster URL or your local MongoDB URL:

   ```shell
   const MongoURL = 'your_mongodb_url'; // Add your atlas cluster url or Local MongoDB url here
   ```
3. Start the server by running:
   ```shell
   node app.js
   ```
4. The server will start running on the specified port (default is 4000). You can access the API at http://localhost:4000.
