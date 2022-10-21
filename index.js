
const mongoose=require("mongoose");


const couponRoutes = require('./routes/coupon.js');
const express=require ('express');
mongoose.connect("mongodb://localhost:27017/cmsdatabase").then (()=>console.log("success connect mongodb"))
.catch((err)=>{console.log(err)});

const app=express();
const PORT =5000;
app.use(express.json());
app.use('/coupons',couponRoutes);
app.get('*',(req,res)=>{
    res.send("page not found")
});

app.listen(PORT,() =>console.log(`server running on port: http://localhost:${PORT}`)

);