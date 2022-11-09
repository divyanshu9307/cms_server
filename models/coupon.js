const mongoose=require("mongoose");
const couponSchema = new mongoose.Schema({
  offerName: {
    type: String,
    required: true,
  },
  couponRedeemNo: {
     type: Number,
      required: true
     },
     typeOfCoupon: { 
    type: String,
     required: true 
    },
  startDate: {
     type: Date,
      
    },
  endDate: {
     type: Date,
      
     },
  discountAmount: {
     type: Number, 
     required: true
     },
});
// console.log(couponSchema);

const  CouponSystem= mongoose.model("CouponSystem",couponSchema);


module.exports=CouponSystem;

