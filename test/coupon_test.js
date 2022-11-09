var chai = require("chai");
var server = require("../index");
var chaiHttp = require("chai-http");
const { expect } = require("chai");
const { body } = require("express-validator");
const CouponSystem = require("../models/coupon");

chai.use(chaiHttp);
describe("API Testing", () => {
  describe("GET api", () => {
    it("Getting all coupons", (done) => {
      const endPoint = "/coupons/getAll";
      chai
        .request(server)
        .get(endPoint)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.allCoupons).to.have.a("array");
          done();
        });
    });

    it("It should not be Getting all coupons", (done) => {
      chai
        .request(server)
        .get("/coupon/getAll")
        .end((err, res) => {
          expect(res).to.have.status(404);
          // expect(res).to.b("page not found")

          done();
        });
    });
  });
  describe("Get api using id", () => {
    it("get coupon by id", () => {
      chai
        .request(server)
        .get("/coupons/getId/" + "6347e5a0048166f6a6fda274")
        .end((err, res) => {
          const response = res.body.detailsOfTheCoupon;
          expect(response).to.be.an("object");
          expect(response).to.have.property("offerName");
          expect(response).to.have.property("typeOfCoupon").equal("flat");
          expect(res).to.have.status(200);
        });
    });

    it("should not get coupon by id", () => {
      chai
        .request(server)
        .get("/coupon/getId/" + "6347e5a0048166f6a6fda274")
        .end((err, res) => {
          const response = res.body.detailsOfTheCoupon;

          expect(res).to.have.status(404);
        });
    });
  });

  describe("Post api", () => {
    // const check=req.body;

    it("Successfully created coupon", () => {
      const body = {
        offerName: "zzzzz",
        couponRedeemNo: 55,
        typeOfCoupon: "flat",

        discountAmount: 45,
        minimumAmountForDiscount: 200,
      };
      chai
        .request(server)
        .post("/coupons/post")
        .send(body)
        .end((err, res) => {
          const { success, savedCoupon } = res.body;
          const response = res.body.savedCoupon;
          expect(response).to.be.an("object");
          expect(response).to.have.property("offerName");
          expect(response).to.have.property("typeOfCoupon");
          expect(res).to.have.status(200);
          expect(success).to.be.true;
        });
    });
    it("should not create a coupon with  offername length wrong", () => {
      const body = {
        offerName: "o",
        couponRedeemNo: 55,
        typeOfCoupon: "flat",

        discountAmount: 45,
        minimumAmountForDiscount: 200,
      };
      chai
        .request(server)
        .post("/coupons/post")
        .send(body)
        .end((err, res) => {
          const { success, savedCoupon } = res.body;
          const response = res.body.savedCoupon;
          // expect(response).to.be.an("object");
          // expect(response).to.have.property("offerName");
          // expect(response).to.have.property("typeOfCoupon");
          expect(res).to.have.status(422);
          // expect(success).to.be.false;
        });
    });
    it("should not create a coupon with  offername as number", () => {
      const body = {
        offerName: "98",
        couponRedeemNo: 55,
        typeOfCoupon: "flat",

        discountAmount: 45,
        minimumAmountForDiscount: 200,
      };
      chai
        .request(server)
        .post("/coupons/post")
        .send(body)
        .end((err, res) => {
          const { success, savedCoupon } = res.body;
          const response = res.body.savedCoupon;
          expect(res).to.have.status(422);
        });
    });

    it("should not create a coupon withot  offername", () => {
      const body = {
        couponRedeemNo: 55,
        typeOfCoupon: "flat",
        discountAmount: 45,
        minimumAmountForDiscount: 200,
      };
      chai
        .request(server)
        .post("/coupons/post")
        .send(body)
        .end((err, res) => {
          const { success, savedCoupon } = res.body;
          const response = res.body.savedCoupon;
          expect(res).to.have.status(422);
        });
    });
    it("should not create a coupon without couponRedeemNo", () => {
      const body = {
        offerName: "ssso",

        typeOfCoupon: "flat",

        discountAmount: 45,
        minimumAmountForDiscount: 200,
      };
      chai
        .request(server)
        .post("/coupons/post")
        .send(body)
        .end((err, res) => {
          const { success, savedCoupon } = res.body;
          const response = res.body.savedCoupon;
          // expect(response).to.be.an("object");
          // expect(response).to.have.property("offerName");
          // expect(response).to.have.property("typeOfCoupon");
          expect(res).to.have.status(422);
          // expect(success).to.be.false;
        });
    });
    it("should not create a coupon with couponRedeemNo paased as alphabet", () => {
      const body = {
        offerName: "ssso",
        couponRedeemNo: "fdf",
        typeOfCoupon: "flat",

        discountAmount: 45,
        minimumAmountForDiscount: 200,
      };
      chai
        .request(server)
        .post("/coupons/post")
        .send(body)
        .end((err, res) => {
          const { success, savedCoupon } = res.body;
          const response = res.body.savedCoupon;
          // expect(response).to.be.an("object");
          // expect(response).to.have.property("offerName");
          // expect(response).to.have.property("typeOfCoupon");
          expect(res).to.have.status(422);
          // expect(success).to.be.false;
        });
    });

    it("should not create a coupon", () => {
      chai
        .request(server)
        .post("/coupon/post")

        .end((err, res) => {
          const response = res.body.savedCoupon;

          expect(res).to.have.status(404);
        });
    });
  });

  describe("Put api", () => {
   

    it("updated coupon", () => {
      const body = {
        offerName: "sinhaaa",
        couponRedeemNo: 55,
        typeOfCoupon: "flat",
  
        discountAmount: 45,
        minimumAmountForDiscount: 200,
      };
      chai
        .request(server)
        .put("/coupons/put/" + "6368c9b85306fc10fa382052")
        .send(body)
        .end((err, res) => {
          const { success, updatedCoupon } = res.body;
          const response = res.body.updatedCoupon;
          expect(response).to.be.an("object");
          expect(response).to.have.property("offerName");
          expect(response).to.have.property("typeOfCoupon");
          expect(res).to.have.status(200);
          expect(success).to.be.true;
        });
    });

    it("should not update a coupon with offername as number ", () => {
      const body = {
        offerName: 45,
        couponRedeemNo: 55,
        typeOfCoupon: "flat",
  
        discountAmount: 45,
        minimumAmountForDiscount: 200,
      };
      chai
        .request(server)
        .put("/coupon/put/" + "6347c70fad1bc65397bcd8bf")
        .send(body)
        .end((err, res) => {
      

          expect(res).to.have.status(404);
          // expect(success).to.be.true;
        });
    });
  });

  describe("Delete api", () => {
    it("Delete a  coupons", () => {
      const delete_test = new CouponSystem({
        offerName: "divyanshuu",
        couponRedeemNo: 55,
        typeOfCoupon: "flat",

        discountAmount: 45,
        minimumAmountForDiscount: 250,
      });
      delete_test.save();
      const endPoint = "/coupons/delete/" + delete_test.id;
      chai
        .request(server)
        .delete(endPoint)
        .end((err, res) => {
          const { success, deletedCoupon } = res.body;
          expect(res).to.have.status(200);
          expect(res.body.deletedCoupon).to.be.an("object");
          expect(success).to.be.true;

          // done();
        });
    });

    it("It should not be delete a coupons", (done) => {
      chai
        .request(server)
        .delete("/coupon/delete/" + "6347e7c4048166f6a6fda276")
        .end((err, res) => {
          expect(res).to.have.status(404);
          // expect(res).to.b("page not found")

          done();
        });
    });
  });
});
