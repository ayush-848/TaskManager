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
  'https://task-manager-p2.vercel.app',
  'http://localhost:3000'
];



app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
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