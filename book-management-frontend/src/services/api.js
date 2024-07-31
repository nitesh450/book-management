import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const register = async (userData) => {
    return await axios.post(`${API_URL}/register`, userData);
};

const login = async (userData) => {
    return await axios.post(`${API_URL}/login`, userData);
};

const createBook = async (bookData, token) => {
    return await axios.post(`${API_URL}/books`, bookData, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
};

const getBooks = async (token) => {
    return await axios.get(`${API_URL}/books`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
};

const updateBook = async (bookId, bookData, token) => {
    return await axios.put(`${API_URL}/books/${bookId}`, bookData, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
};

const deleteBook = async (bookId, token) => {
    return await axios.delete(`${API_URL}/books/${bookId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
};

export { register, login, createBook, getBooks, updateBook, deleteBook };
