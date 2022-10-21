const express=require('express');
const router=express.Router();
const Coupon=require('../models/coupon')
// getting coupons
router.get('/',async(req,res)=>{
    try{
        const coupons=await Coupon.find();
        res.status(200).json({
            success: true,
            allCoupons:coupons});

    }
    catch(err){
        res.status(404).json({ 
            message:err
        })
    }
    
});
// get details of particular coupon
router.get('/:id',async(req,res)=>{
   try{const coupon=await Coupon.findById(req.params.id);
    res.status(200).json({
        success:true,
        detailsOfTheCoupon :coupon
    });
   }
   catch(err){
    res.status(404).json({
        message:err
    })
   }

   } 

);
// save a coupon
router.post('/', async(req,res)=>{
    try{
        
        const coupon=new Coupon(req.body);
        const savedCoupon=await coupon.save();
        // res.send("coupon saved to database");// alternate of res.json
        res.status(200).json(
            {
            success :true , 
            savedCoupon :savedCoupon
        });
        // res.status(200).json({
        //     success: true,
        // });
    }catch(err){
        res.status(404).json({
            message:err
        })
    }
})

// update a coupon
router.put('/:id',async(req,res)=>{
    try{
        let couponUpdate=await Coupon.findById(req.params.id);
        couponUpdate= await Coupon.findByIdAndUpdate(req.params.id,req.body,{new:true}
            );
        res.status(200).json({
            success : true,
            updatedCoupon : couponUpdate
        });
    }catch(err){
        res.status(404).json({
            message:err
        })
    }
    
    
})
//delete a coupon
router.delete('/:id',async (req,res)=>{
    try{
        const deleteCoupon= await Coupon.findByIdAndDelete(req.params.id)
          res.status(200).json({
            success : true,
            deletedCoupon:deleteCoupon
          })
    }
    catch(err){
        res.status(404).json({
            message:err
        })
    }
})

module.exports = router;