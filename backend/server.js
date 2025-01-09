const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./src/routes/authRouter');
const idRouter = require('./src/routes/idRouter');
require('dotenv').config();
require('./src/config/connectDB');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
  'https://task-manager-p2.vercel.app', // Your production frontend URL
  'http://localhost:3000' // Localhost URL for development
];

// Enable CORS with specific origins
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests without origin (e.g., mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // Allow cookies to be sent with requests
}));

// Test route to check server is working
app.get('/ping', (req, res) => {
  res.send('PONG');
});

// Middleware to parse incoming requests
app.use(bodyParser.json());

// Route handling
app.use('/auth', authRouter);
app.use('/id', idRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
