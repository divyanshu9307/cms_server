const express=require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const couponController=require('../controllers/couponController')
const { Mongoose } = require('mongoose');

const Coupon=require('../models/coupon');
const getCoupon = require('../controllers/couponController');
const getCouponById=require('../controllers/couponController')
// getting coupons
router.get('/getAll',async (req,res)=>{
  const coupon=await couponController.getCoupon();
  if(!coupon){
    res.status(400).json({
           success: false,
           message:"Bad request"
       })
    //bad request
  }
  return  res.status(200).json({
    success: true,
    allCoupons: coupon,
  });
});
// get details of particular coupon
// router.get('/getId/:id',couponController.getCouponById);
router.get('/getId/:id',async(req,res)=>{
  const coupon=await couponController.getCouponById(req.params.id);
  // console.log(coupon)
  if(!coupon){
  return   res.status(400).json({
           success: false,
           message:"Bad request"
       })
    //bad request
  }
   return res.status(200).json({
    success: true,
    detailsOfTheCoupon: coupon,
  });

});


// save a coupon

router.post('/post',[
  body('offerName').isAlpha().isLength({min:2,max:10}),
  body('couponRedeemNo').isNumeric(),
  body('discountAmount').isNumeric(),
  body('minimumAmountForDiscount').isNumeric()
], async(req,res)=>{
  
  const {
    offerName,
    couponRedeemNo,
    typeOfCoupon,
    startDate,
    endDate,
    discountAmount,
    minimumAmountForDiscount,
  } = req.body;
  const data = {
    offerName,
    couponRedeemNo,
    typeOfCoupon,
    startDate,
    endDate,
    discountAmount,
    minimumAmountForDiscount,
  };

  const coupon = new Coupon(data);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const coupons = await couponController.savedCoupons(coupon);
  if (!coupons) {
    return res.status(400).json({
      success: false,
      message: "Bad request",
    });
  }

  return res.status(200).json({
    success: true,
    savedCoupon: coupons,
  });

})

// update a coupon
router.put('/put/:id',
[
  body('offerName').isAlpha().isLength({min:2,max:10}),
  body('couponRedeemNo').isNumeric(),
  body('discountAmount').isNumeric(),
  body('minimumAmountForDiscount').isNumeric()
]
,async(req,res)=>{
  
  const {offerName,
  couponRedeemNo,
  typeOfCoupon,
  
  discountAmount,
  minimumAmountForDiscount
}=req.body
const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const coupons = await couponController.updateCoupon(req.params.id,req.body)
  if (!coupons) {
    return res.status(400).json({
      success: false,
      message: "Bad request",
    });
  }
  return res.status(200).json({
    success: true,
    savedCoupon: coupons,
  });
})
//delete a coupon
router.delete('/delete/:id',async(req,res)=>{
  const coupons= await couponController.deletedCoupon(req.params.id)
  if (!coupons) {
    return res.status(400).json({
      success: false,
      message: "Bad request",
    });
  }
  return res.status(200).json({
    success: true,
    deleteCoupon: coupons,
  });

})

module.exports = router;