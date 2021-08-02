import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dtos";
import { Vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const FindVendor = async (id: string | undefined, email?: string) => {
  if (email) return await Vendor.findOne({ email });
  else return await Vendor.findById(id);
};

export const CreateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    address,
    pincode,
    foodType,
    email,
    password,
    ownerName,
    phone,
  } = <CreateVendorInput>req.body;

  const exsistingVendor = await FindVendor("", email);

  if (exsistingVendor !== null) {
    return res.json({ message: "A vendor is exsist with this email ID" });
  }

  //generate a salt
  const salt = await GenerateSalt();
  // encrypt the password using the salt
  const userPassword = await GeneratePassword(password, salt);

  const createdVendor = await Vendor.create({
    name,
    address,
    pincode,
    foodType,
    email,
    password: userPassword,
    ownerName,
    phone,
    salt,
    rating: 0,
    serviceAvailable: false,
    coverImages: [],
    foods: [],
  });

  return res.json(createdVendor);
};

export const GetVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendors = await Vendor.find();
  if (vendors !== null) return res.json(vendors);

  return res.json({ message: "Vendors data  not available!!" });
};

export const GetVendorByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendorId = req.params.id;

  const vendor = await FindVendor(vendorId);

  if (vendor !== null) return res.json(vendor);

  return res.json({ message: "Vendors data  not available!!" });
};
