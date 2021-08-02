import express, { Request, Response, NextFunction } from "express";
import {
  CustomerLogin,
  CustomerSignUp,
  CustomerVerify,
  EditCustomerProfile,
  GetCustomerProfile,
  RequestOtp,
} from "../controllers";
import { Authenticate } from "../middlewares";

const router = express.Router();

/** ============== SignUp/Create Customer  ================== **/

router.get("/signup", CustomerSignUp);

/** ============== Login ================== **/
router.get("/login", CustomerLogin);

//authentication
router.use(Authenticate);

/** ============== Verify Customer Account ================== **/

router.patch("/verify", CustomerVerify);

/** ============== Otp / Request OTP ================== **/

router.get("/otp", RequestOtp);

/** ============== Profile ================== **/

router.get("/profile", GetCustomerProfile);

router.patch("/profile", EditCustomerProfile);

//Cart
//Order
//Payment

export { router as CustomerRoute };
