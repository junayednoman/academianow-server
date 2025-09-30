import handleAsyncRequest from "../../utils/handleAsyncRequest";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.service";
import { Request, Response } from "express";

const userSignUp = handleAsyncRequest(async (req: Request, res: Response) => {
  const result = await userServices.userSignUp(req.body);
  sendResponse(res, {
    message: "User signed up successfully!",
    data: result,
  });
});

export const userController = {
  userSignUp,
};
