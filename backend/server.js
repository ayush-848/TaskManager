const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const idRouter = require('./routes/idRouter');
require('dotenv').config();
require('./config/connectDB');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

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
