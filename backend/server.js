const express= require('express');
const app=express();
const bodyParser=require('body-parser');
const authRouter=require('./src/routes/authRouter');
const idRouter=require('./src/routes/idRouter')

require('dotenv').config();
require('./src/config/connectDB')


const PORT=process.env.PORT || 5000;



app.get('/ping', (req, res) => {
  res.send('PONG');
});

app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/id', idRouter);


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})