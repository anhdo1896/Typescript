import express, { Request, Response, NextFunction } from "express";
import { CreateVendor, GetVendor, GetVendorByID } from "../controllers";

const router = express.Router();

router.post("/create-vendor", CreateVendor);
router.get("/vendors", GetVendor);
router.get("/vendor/:id", GetVendorByID);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello Admin" });
});

export { router as AdminRoute };
