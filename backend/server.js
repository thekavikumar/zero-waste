require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRoute = require('./routes/userRoute');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// MongoDB connection
connectDB();

// Routes
app.use('/api/users', userRoute);

// Placeholder route
app.get('/', (req, res) => {
  res.send('ZeroWaste Backend API');
});

// Listen for requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
