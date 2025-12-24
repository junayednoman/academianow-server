import { TRequest } from "../../interface/global.interface";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
import { sendResponse } from "../../utils/sendResponse";
import { dashboardServices } from "./dashboard.service";

const getUserOverview = handleAsyncRequest(async (req: TRequest, res) => {
  const result = await dashboardServices.getUserOverview(req.query);
  sendResponse(res, {
    message: "Dashboard overview retrieved successfully!",
    data: result,
  });
});

export const dashboardController = { getUserOverview };
