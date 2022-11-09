const { body, validationResult } = require("express-validator");
const mongoose=require("mongoose");

const Coupon = require("../models/coupon");

// get coupons
const getCoupon = async () => {
//   console.log(req.body);
  try {
    const coupons = await Coupon.find();

   return coupons;
  } catch (err) {
   //logger
   return null;
  }
};


const getCouponById = async (couponId) => {
  try {
    // console.log("hellloo")
    const coupons = await Coupon.findById(couponId);
    // console.log("sssssssssss")
    return coupons;
} catch (err) {
    return null
  }
};

const savedCoupons = async (coupon) => {
//   console.log(req.body);
  //
  
  try {
    const savedCoupon = await coupon.save();
return savedCoupon
    
  } catch (err) {
   return null
  }
};
const updateCoupon = async (couponId,updatedValue) => {
 
// console.log(req.params);
try {
    const couponUpdate = await Coupon.findByIdAndUpdate(
      couponId,
      updatedValue,
      { new: true }
    );

    return couponUpdate;
  } catch (err) {
    return null
  }
};
const deletedCoupon = async (couponId) => {
  try {
    const deleteCoupon = await Coupon.findByIdAndDelete(couponId);
    // console.log(deleteCoupon)
    return deleteCoupon;

   
  } catch (err) {
   return null
  }
};
module.exports = {
  getCoupon,
  getCouponById,
  savedCoupons,
  updateCoupon,
  deletedCoupon,
};

