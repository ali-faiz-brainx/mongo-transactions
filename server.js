require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api', require('./routes'));

// Routes and transaction examples will be added here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
