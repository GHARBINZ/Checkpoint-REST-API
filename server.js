const express = require('express');
const mongoose = require('mongoose');
// Configuring environment variables from the specific config path
require('dotenv').config({ path: './config/.env' });

// Importing the User model
const User = require('./models/User');

const app = express();

// Middleware to automatically parse incoming JSON payloads
app.use(express.json());

// Connecting to the MongoDB Database using the URI from .env
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch((err) => console.error('Database connection error:', err));

// ==================== REST API ROUTES ====================

// 1. GET : RETURN ALL USERS
app.get('/users', async (req, res) => {
    try {
        // Mongoose find() method returns all records from the collection
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// 2. POST : ADD A NEW USER TO THE DATABASE
app.post('/users', async (req, res) => {
    try {
        const { name, email, age } = req.body;

        // Instantiating a new document from the User model
        const newUser = new User({ name, email, age });

        // Saving the document into the database
        await newUser.save();
        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Error saving user', error: error.message });
    }
});

// 3. PUT : EDIT A USER BY ID
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        // Finds document by ID and updates it with the new fields
        // { new: true } returns the updated version of the document instead of the original
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error: error.message });
    }
});

// 4. DELETE : REMOVE A USER BY ID
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Finds the document by ID and deletes it instantly
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

// Setting up the Express server port listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
});
