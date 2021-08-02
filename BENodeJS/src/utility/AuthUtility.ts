import { Request } from "express";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../config";
import { VendorPayload } from "../dtos";
import { AuthPayload } from "../dtos/Auth.dto";

export const GenenerateSignature =  (payload: AuthPayload) => {
  return  jwt.sign(payload, APP_SECRET, { expiresIn: "1d" });
};

export const ValidateSignature = async (req: Request) => {
  const signature = req.get("Authorization");

  if (signature) {
    const payload = (await jwt.verify(
      signature.split(" ")[1],
      APP_SECRET
    )) as AuthPayload;

    req.user = payload;

    return true;
  }
  return false;
};
