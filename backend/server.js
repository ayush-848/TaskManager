const express= require('express');
const app=express();
const bodyParser=require('body-parser'); // for getting the data from body
const cors=require('cors');
const authRouter=require('./src/routes/authRouter');
const idRouter=require('./src/routes/idRouter')

require('dotenv').config();
require('./src/config/connectDB')


const PORT=process.env.PORT || 5000;

const allowedOrigins = [
  'https://task-manager-p2.vercel.app', // Frontend domain
];

// Use CORS with specific configurations
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // If you're using cookies for authentication
}));

app.get('/ping', (req, res) => {
  res.send('PONG');
});

app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/id', idRouter);


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})