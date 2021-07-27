import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dtos";
import { Vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility/PasswordUtility";

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

  const exsistingVendor = await Vendor.findOne({email});

  if(exsistingVendor !== null)
  {
      return res.json({"message":"A vendor is exsist with this email ID"});
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
    password:userPassword,
    ownerName,
    phone,
    salt,
    rating: 0,
    serviceAvailable: false,
    coverImages: [],
  });

  return res.json(createdVendor);
};

export const GetVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const GetVendorByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
