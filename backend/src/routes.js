const express = require('express');
const { register, login, verifyToken, authorizeRole } = require('./controllers');
const { createBook, getBooks, updateBook, deleteBook, upload } = require('./bookController');
const { validateBook } = require('./validators');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/books', verifyToken, authorizeRole(['Admin', 'Author']), upload.single('coverPage'), validateBook, createBook);
router.get('/books', verifyToken, authorizeRole(['Admin', 'Author', 'Reader']), getBooks);
router.put('/books/:id', verifyToken, authorizeRole(['Admin', 'Author']), upload.single('coverPage'), validateBook, updateBook);
router.delete('/books/:id', verifyToken, authorizeRole(['Admin']), deleteBook);

module.exports = router;
