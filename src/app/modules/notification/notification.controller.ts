import { TRequest } from "../../interface/global.interface";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
import { sendResponse } from "../../utils/sendResponse";
import { notificationService } from "./notification.service";

const createNotification = handleAsyncRequest(async (req: TRequest, res) => {
  const result = await notificationService.createNotification(req.user!.id);
  sendResponse(res, {
    message: "Notification created!",
    data: result,
  });
});

const getNotifications = handleAsyncRequest(async (req: TRequest, res) => {
  const result = await notificationService.getNotifications(req.user!.id);
  sendResponse(res, {
    message: "Notifications retrieved successfully!",
    data: result,
  });
});

const deleteNotifications = handleAsyncRequest(async (req: TRequest, res) => {
  const result = await notificationService.deleteNotifications(
    req.user!.id,
    req.body.ids
  );
  sendResponse(res, {
    message: "Notifications deleted successfully!",
    data: result,
  });
});

export const notificationController = {
  createNotification,
  getNotifications,
  deleteNotifications
};
