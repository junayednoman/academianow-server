import { TRequest } from "../../interface/global.interface";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payment.service";

const createPayment = handleAsyncRequest(async (req: TRequest, res) => {
  const result = await paymentService.createPayment(req.user!.id, req.body);
  sendResponse(res, {
    message: "Payment created successfully!",
    data: result,
  });
});

export const paymentController = {
  createPayment,
};
