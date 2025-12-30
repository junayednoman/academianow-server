import { Payment } from "@prisma/client";
import prisma from "../../utils/prisma";
import { generateTransactionId } from "../../utils/generateTransactionId";

const createPayment = async (authId: string, payload: Payment) => {
  if (payload.subscriptionId) {
    await prisma.subscription.findUniqueOrThrow({
      where: { id: payload.subscriptionId },
    });
  }
  const transactionId = generateTransactionId();
  payload.transactionId = transactionId;
  payload.authId = authId;
  payload.paidAt = new Date();

  const result = await prisma.payment.create({
    data: payload,
  });

  return result;
};

export const paymentService = {
  createPayment,
};
