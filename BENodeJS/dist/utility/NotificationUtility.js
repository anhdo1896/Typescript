"use strict";
//Email
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
exports.onRequestOtp = exports.GenerateOtp = void 0;
//Notification
//OTP
const GenerateOtp = () => {
    const otp = Math.floor(10000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + 5 * 60 * 1000);
    return { otp, expiry };
};
exports.GenerateOtp = GenerateOtp;
const onRequestOtp = (otp, toPhoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const accountSid = "AC4c1ef542ca8105e5860a1d1eb39ac4a9";
    const authToken = "43b934fc21ca4919ac52c09d63a5376f";
    const client = require("twilio")(accountSid, authToken);
    const response = yield client.messages.create({
        body: `Your OTP is ${otp}`,
        from: "+12169302290",
        to: `+84${toPhoneNumber}`,
    });
    return response;
});
exports.onRequestOtp = onRequestOtp;
//Payment notification or emails
//# sourceMappingURL=NotificationUtility.js.map