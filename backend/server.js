const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./src/routes/authRouter');
const idRouter = require('./src/routes/idRouter');
require('dotenv').config();
require('./src/config/connectDB');
const PORT = process.env.PORT || 5000;

// Move cors middleware before any routes
const corsOptions = {
  origin: ['http://localhost:3000', 'https://task-manager-steel-one.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,  // Add this line
  optionsSuccessStatus: 204  // Add this line
};

// Apply cors middleware before routes
app.use(cors(corsOptions));

// Then add your other middleware
app.use(bodyParser.json());

// Routes
app.get('/ping', (req, res) => {
  res.send("KEda re");
});
app.use('/auth', authRouter);
app.use('/id', idRouter);

app.listen(PORT, () => {
  console.log(`Server is at http://localhost:${PORT}/`);
});
