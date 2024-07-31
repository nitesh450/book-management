const { Book } = require('./models');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const createBook = async (req, res) => {
    const { title, author, year } = req.body;
    const coverPage = req.file ? req.file.buffer.toString('base64') : null;

    const newBook = new Book({ title, author, year, coverPage });
    await newBook.save();

    res.status(201).json({ message: 'Book created successfully' });
};

const getBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books);
};

const updateBook = async (req, res) => {
    const { title, author, year } = req.body;
    const coverPage = req.file ? req.file.buffer.toString('base64') : null;

    const book = await Book.findByIdAndUpdate(req.params.id, { title, author, year, coverPage }, { new: true });
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
};

const deleteBook = async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
};

module.exports = { createBook, getBooks, updateBook, deleteBook, upload };
