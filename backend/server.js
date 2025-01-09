const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./src/routes/authRouter');
const idRouter = require('./src/routes/idRouter');
require('dotenv').config();
require('./src/config/connectDB');
const PORT = process.env.PORT || 5000;

// Simple CORS config that allows all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());

app.get('/ping', (req, res) => {
  res.send("KEda re");
});

app.use('/auth', authRouter);
app.use('/id', idRouter);

app.listen(PORT, () => {
  console.log(`Server is at http://localhost:${PORT}/`);
});
