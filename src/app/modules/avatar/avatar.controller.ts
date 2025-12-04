import { Response } from "express";
import { avatarServices } from "./avatar.service";
import { sendResponse } from "../../utils/sendResponse";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
import { TRequest } from "../../interface/global.interface";
import { TFile } from "../../interface/file.interface";

const createAvatar = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await avatarServices.createAvatar(req.body, req.file as any);
    sendResponse(res, {
      message: "Avatar created successfully!",
      data: result,
    });
  }
);

const getAllAvatars = handleAsyncRequest(
  async (_req: TRequest, res: Response) => {
    const result = await avatarServices.getAllAvatars();
    sendResponse(res, {
      message: "Avatars fetched successfully!",
      data: result,
    });
  }
);

const updateAvatar = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const { id } = req.params;
    const result = await avatarServices.updateAvatar(
      id as string,
      req.body,
      req.file as TFile
    );
    sendResponse(res, {
      message: "Avatar updated successfully!",
      data: result,
    });
  }
);

const deleteAvatar = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const { id } = req.params;
    const result = await avatarServices.deleteAvatar(id as string);
    sendResponse(res, {
      message: "Avatar deleted successfully!",
      data: result,
    });
  }
);

export const avatarController = {
  createAvatar,
  getAllAvatars,
  updateAvatar,
  deleteAvatar,
};
