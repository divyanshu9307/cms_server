const mongoose=require("mongoose");
const couponSchema = new mongoose.Schema({
  offerName: {
    type: String,
    required: true,
  },

  typeOfCoupon: String,
  startDate: Date,
  endDate: Date,
  discountAmount: Number,
  minimumAmountForDiscount: Number,
});
const  CouponSystem= mongoose.model("CouponSystem",couponSchema);


module.exports=CouponSystem;

