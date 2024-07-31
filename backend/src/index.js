const express = require('express');
const { connectDB } = require('./config');
const routes = require('./routes');
const { requestLogger, errorHandler } = require('./middleware');



const app = express();
const PORT = process.env.PORT || 3000;

app.use(requestLogger);
app.use(errorHandler);

app.use(express.json());
app.use('/api', routes);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
