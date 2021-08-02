//Email

//Notification

//OTP
export const GenerateOtp = () => {
  const otp = Math.floor(10000 + Math.random() * 900000);
  let expiry = new Date();
  expiry.setTime(new Date().getTime() + 5 * 60 * 1000);

  return { otp, expiry };
};

export const onRequestOtp = async (otp: number, toPhoneNumber: string) => {
  const accountSid = "AC4c1ef542ca8105e5860a1d1eb39ac4a9";
  const authToken = "43b934fc21ca4919ac52c09d63a5376f";
  const client = require("twilio")(accountSid, authToken);

  const response = await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: "+12169302290",
    to: `+84${toPhoneNumber}`,
  });

  return response;
};

//Payment notification or emails
