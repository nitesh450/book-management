const Book = require('../models/Book');
const { validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage }).single('coverPage');

exports.createBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ msg: 'File upload error' });
    }

    const { title, author, year } = req.body;
    const coverPage = req.file ? req.file.path : '';

    try {
      const newBook = new Book({ title, author, coverPage, year });
      await newBook.save();
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  });
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Additional methods for update, delete, and view a single book can be added similarly
