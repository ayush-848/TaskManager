const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const idRouter = require('./routes/idRouter');
require('dotenv').config();
require('./config/connectDB');
const path=require('path')

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

// Test route to check server is working
app.get('/ping', (req, res) => {
  res.send('PONG');
});
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
  console.log(`Serving static file for ${req.url}`);
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'), (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Server Error');
    }
  });
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
