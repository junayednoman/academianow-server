import { TRequest } from "../../interface/global.interface";
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

const getProfile = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const result = await userServices.getProfile(req.user?.email as string);
  sendResponse(res, {
    message: "Profile fetched successfully!",
    data: result,
  });
});

const updateProfile = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await userServices.updateProfile(
      req.user?.email as string,
      req.body
    );
    sendResponse(res, {
      message: "Profile updated successfully!",
      data: result,
    });
  }
);

export const userController = {
  userSignUp,
  getProfile,
  updateProfile,
};
