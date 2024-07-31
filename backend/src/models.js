const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    coverPage: {
        type: String,
    },
    year: {
        type: Number,
        required: true,
    },
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Admin', 'Author', 'Reader'],
        required: true,
    },
});

const Book = mongoose.model('Book', bookSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Book, User };
