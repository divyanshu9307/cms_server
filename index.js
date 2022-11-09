const mongoose=require("mongoose");
const express=require ('express');

const couponRoutes = require('./routes/coupon.js');




mongoose
  .connect("mongodb://localhost:27017/cmsdatabase")
  .then(() => console.log("success connect mongodb"))
  .catch((err) => {
    console.log(err);
  });

const app=express();
// console.log(typeof app)
// console.log(app)
const PORT =5000;
app.use(express.json());
app.use('/coupons',couponRoutes);
app.get('*',(req,res)=>{
    res.status(404).json({
      success:false,
      message:"page not found"
    })
    
});

app.listen(PORT,() =>console.log(`server running on port: http://localhost:${PORT}`)

);
module.exports=app;