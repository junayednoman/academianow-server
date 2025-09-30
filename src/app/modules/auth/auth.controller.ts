import handleAsyncRequest from "../../utils/handleAsyncRequest";
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from "express";
import { authServices } from "./auth.service";

const verifyOtp = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await authServices.verifyOtp(req.body);
  sendResponse(res, {
    message: "OTP verified successfully!",
    data: result,
  });
});

export const authController = {
  verifyOtp,
};
