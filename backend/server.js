const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./src/config/connectDB');

const authRouter = require('./src/routes/authRouter');
const idRouter = require('./src/routes/idRouter');

const PORT = process.env.PORT || 5000;

// Allow CORS for specific origin
const corsOptions = {
  origin: 'https://task-manager-steel-one.vercel.app', // Your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get('/ping', (req, res) => {
  res.send('KEda re');
});

app.use('/auth', authRouter);
app.use('/id', idRouter);

app.listen(PORT, () => {
  console.log(`Server is at http://localhost:${PORT}/`);
});
