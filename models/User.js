const mongoose = require('mongoose');

// Defining the schema for our User document
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Exporting the model to use it in server.js
module.exports = mongoose.model('User', userSchema);
