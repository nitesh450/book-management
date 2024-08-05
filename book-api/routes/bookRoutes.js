const express = require('express');
const { check } = require('express-validator');
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('author', 'Author is required').not().isEmpty(),
  ],
  authMiddleware(['Admin', 'Author']),
  bookController.createBook
);

router.get('/', authMiddleware(['Admin', 'Author', 'Reader']), bookController.getBooks);

// Additional routes for update, delete, and view a single book can be added similarly

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               coverPage:
 *                 type: string
 *                 format: binary
 *               year:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Successfully retrieved books
 */


module.exports = router;
