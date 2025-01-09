const authenticated = require('../middlewares/auth');

const router=require('express').Router();


router.get('/',authenticated,(req,res)=>{
    res.json([
        {
            name:"Ayush",
            roll:"22UME014"
        },
        {
            name:"Bapan",
            roll:"22UME015"
        },
        {
            name:"Bishal",
            roll:"22UME038"
        }
    ])
})


module.exports=router;