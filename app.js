const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const authRoutes = require('./routes/authRoutes');  // Ensure this path is correct
const bookRoutes = require('./routes/bookRoutes');  // Ensure this path is correct
const errorMiddleware = require('./middlewares/errorMiddleware');
const requestLogger = require('./middlewares/requestLogger');

dotenv.config();
const app = express();

app.use(express.json());
app.use(requestLogger);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Book API',
      version: '1.0.0',
      description: 'API for managing books',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use(errorMiddleware);

module.exports = app;
