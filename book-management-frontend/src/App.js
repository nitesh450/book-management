import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Books from './pages/Books';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <Router>
            <div>
                <nav>
                    <button onClick={handleLogout}>Logout</button>
                </nav>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login setToken={handleLogin} />} />
                    <Route path="/books" element={token ? <Books token={token} /> : <Navigate to="/login" />} />
                    <Route path="/" element={<Navigate to="/books" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
