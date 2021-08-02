"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditCustomerProfile = exports.GetCustomerProfile = exports.RequestOtp = exports.CustomerVerify = exports.CustomerLogin = exports.CustomerSignUp = void 0;
const dtos_1 = require("../dtos");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const utility_1 = require("../utility");
const models_1 = require("../models");
const CustomerSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerInputs = class_transformer_1.plainToClass(dtos_1.CreateCustomerInput, req.body);
    const inputErrors = yield class_validator_1.validate(customerInputs, {
        validationError: { target: true },
    });
    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors);
    }
    const { email, phone, password } = customerInputs;
    const salt = yield utility_1.GenerateSalt();
    const userPassword = yield utility_1.GeneratePassword(password, salt);
    const { otp, expiry } = utility_1.GenerateOtp();
    const existCustomer = models_1.Customer.findOne({ email });
    if (existCustomer !== null)
        return res.status(400).json({ message: "An user exist with this email" });
    const result = yield models_1.Customer.create({
        email,
        salt,
        password: userPassword,
        phone,
        otp,
        otp_expiry: expiry,
        firstName: "",
        lastName: "",
        address: "",
        verified: false,
        lat: 0,
        lng: 0,
    });
    if (result) {
        // Send the OTP to customer
        yield utility_1.onRequestOtp(otp, phone);
        // generate the signature
        const signature = utility_1.GenenerateSignature({
            _id: result._id,
            email: result.email,
            verified: result.verified,
        });
        // send the result to client
        return res.status(201).json({
            signature: signature,
            email: result.email,
            verified: result.verified,
        });
    }
    return res.status(400).json({ message: "Error with signup" });
});
exports.CustomerSignUp = CustomerSignUp;
const CustomerLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInputs = class_transformer_1.plainToClass(dtos_1.UserLoginInput, req.body);
    const inputErrors = yield class_validator_1.validate(loginInputs, {
        validationError: { target: true },
    });
    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors);
    }
    const { email, password } = loginInputs;
    const customer = yield models_1.Customer.findOne({ email });
    if (customer) {
        const validation = yield utility_1.ValidatePassword(password, customer.password, customer.salt);
        if (validation) {
            const signature = utility_1.GenenerateSignature({
                _id: customer._id,
                email: customer.email,
                verified: customer.verified,
            });
            return res.status(201).json({
                signature: signature,
                email: customer.email,
                verified: customer.verified,
            });
        }
    }
    return res.status(400).json({ message: "Error with login" });
});
exports.CustomerLogin = CustomerLogin;
const CustomerVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp } = req.body;
    const customer = req.user;
    if (customer) {
        const profile = yield models_1.Customer.findById(customer._id);
        if (profile) {
            if (profile.otp === parseInt(otp) && profile.otp_expiry <= new Date()) {
                profile.verified = true;
                const updatedCustomerResponse = yield profile.save();
                //generate the signature
                const signature = utility_1.GenenerateSignature({
                    _id: updatedCustomerResponse._id,
                    email: updatedCustomerResponse.email,
                    verified: updatedCustomerResponse.verified,
                });
                return res.status(201).json({
                    signature: signature,
                    email: updatedCustomerResponse.email,
                    verified: updatedCustomerResponse.verified,
                });
            }
        }
    }
    return res.status(400).json({ message: "Error with OTP  " });
});
exports.CustomerVerify = CustomerVerify;
const RequestOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield models_1.Customer.findById(customer._id);
        if (profile) {
            const { otp, expiry } = utility_1.GenerateOtp();
            profile.otp = otp;
            profile.otp_expiry = expiry;
            yield profile.save();
            yield utility_1.onRequestOtp(otp, profile.phone);
            return res
                .status(200)
                .json({ message: "OTP sent your registered phone number!" });
        }
    }
    return res.status(400).json({ message: "Error with request OTP" });
});
exports.RequestOtp = RequestOtp;
const GetCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield models_1.Customer.findById(customer._id);
        if (profile) {
            res.status(200).json(profile);
        }
    }
    return res.status(400).json({ message: "Error with fetch profile" });
});
exports.GetCustomerProfile = GetCustomerProfile;
const EditCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    const profileInput = class_transformer_1.plainToClass(dtos_1.EditCustomerProfileInput, req.body);
    const profileErrors = yield class_validator_1.validate(profileInput, {
        validationError: { target: false },
    });
    if (profileErrors.length > 0) {
        return res.status(400).json(profileErrors);
    }
    const { firstName, lastName, address } = profileInput;
    if (customer) {
        const profile = yield models_1.Customer.findById(customer._id);
        if (profile) {
            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.address = address;
            const result = yield profile.save();
            return res.status(200).json(result);
        }
    }
    return res.status(400).json({ message: "Error with edit profile" });
});
exports.EditCustomerProfile = EditCustomerProfile;
//# sourceMappingURL=CustomerController.js.map