import React, { useState, useEffect } from 'react';
import { createBook, getBooks, updateBook, deleteBook } from '../services/api';

const Books = ({ token }) => {
    const [books, setBooks] = useState([]);
    const [formData, setFormData] = useState({ title: '', author: '', year: '', coverPage: null });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks(token);
                setBooks(response.data);
            } catch (error) {
                setMessage('Failed to fetch books');
            }
        };
        fetchBooks();
    }, [token]);

    const handleChange = (e) => {
        if (e.target.name === 'coverPage') {
            setFormData({ ...formData, coverPage: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookData = new FormData();
        bookData.append('title', formData.title);
        bookData.append('author', formData.author);
        bookData.append('year', formData.year);
        if (formData.coverPage) {
            bookData.append('coverPage', formData.coverPage);
        }

        try {
            await createBook(bookData, token);
            setMessage('Book created successfully');
        } catch (error) {
            setMessage('Failed to create book');
        }
    };

    return (
        <div>
            <h2>Books</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
                <input type="text" name="author" placeholder="Author" onChange={handleChange} required />
                <input type="number" name="year" placeholder="Year" onChange={handleChange} required />
                <input type="file" name="coverPage" onChange={handleChange} />
                <button type="submit">Create Book</button>
            </form>
            {message && <p>{message}</p>}
            <ul>
                {books.map((book) => (
                    <li key={book._id}>
                        {book.title} by {book.author} ({book.year})
                        <button onClick={() => deleteBook(book._id, token)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Books;
