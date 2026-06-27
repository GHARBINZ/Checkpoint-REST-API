# REST API Project - MERN Stack

This is a backend REST API project developed as part of the Gomycode Web Development bootcamp. It allows users to perform CRUD (Create, Read, Update, Delete) operations on a user collection using MongoDB.

## Features
- **Create**: Add a new user with name, email, and age.
- **Read**: Fetch all users or a specific user.
- **Update**: Modify user information by ID.
- **Delete**: Remove a user from the database by ID.

## Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Postman (for API testing)

## Setup Instructions
1. Clone this repository.
2. Install dependencies: `npm install`
3. Create a `.env` file and add your `MONGO_URI` and `PORT`.
4. Start the server: `node server.js`

## API Endpoints
- `POST /users`: Create a new user.
- `GET /users`: Get all users.
- `PUT /users/:id`: Update a user.
- `DELETE /users/:id`: Delete a user.

## Author
Mohamed Amine Harbi
Student at Gomycode
