import admin from "firebase-admin";
import firebaseJsonFile from "../private/academia-service.json";
import { Notification } from "@prisma/client";
import prisma from "./prisma";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseJsonFile as admin.ServiceAccount),
  });
}

export const sendNotification = async (
  fcmTokens: string[],
  payload: Omit<Notification, "id">
): Promise<any> => {
  try {
    const response = await admin.messaging().sendEachForMulticast({
      tokens: fcmTokens,
      notification: {
        title: payload.title,
        body: payload.body,
      },
      apns: {
        headers: {
          "apns-push-type": "alert",
        },
        payload: {
          aps: {
            badge: 1,
            sound: "default",
          },
        },
      },
    });

    if (response.successCount) {
      fcmTokens?.map(async token => {
        try {
          if (token) {
            await prisma.notification.create({
              data: payload,
            });
          } else {
            console.log("Token not found");
          }
        } catch (error) {
          console.log(error);
        }
      });
    }

    return response;
  } catch (error: any) {
    if (error?.code === "messaging/third-party-auth-error") {
      return null;
    } else {
      console.log(error.message);
    }
  }
};

export const firebaseAdmin = admin;
