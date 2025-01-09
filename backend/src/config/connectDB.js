const mongoose=require('mongoose');

const MONGO_URI=process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(()=>{
    console.log('Database connected');
}).catch((error)=>{
    console.log('MongoDB connection error',error);
})