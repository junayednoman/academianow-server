import { TRequest } from "../../interface/global.interface";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
import pick from "../../utils/pick";
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

const getAllUsers = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const options = pick(req.query, ["page", "limit", "sortBy", "orderBy"]);
  const result = await userServices.getAllUsers(req.query, options);
  sendResponse(res, {
    message: "Users fetched successfully!",
    data: result,
  });
});

const getSingleUser = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await userServices.getSingleUser(req.params?.id as string);
    sendResponse(res, {
      message: "User fetched successfully!",
      data: result,
    });
  }
);

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

const updateLastPracticeDate = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await userServices.updateLastPracticeDate(
      req.user?.email as string,
      req.body
    );
    sendResponse(res, {
      message: "Date updated successfully!",
      data: result,
    });
  }
);

export const userController = {
  userSignUp,
  getAllUsers,
  getSingleUser,
  getProfile,
  updateProfile,
  updateLastPracticeDate,
};
