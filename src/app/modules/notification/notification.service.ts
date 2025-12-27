import prisma from "../../utils/prisma";

const createNotification = async (userId: string) => {
  const payload = {
    receiverId: userId,
    title: "New Feature Released",
    body: "Check out the new feature in our app now!",
  };

  const result = await prisma.notification.create({ data: payload });
  return result;
};

const getNotifications = async (userId: string) => {
  const notifications = await prisma.notification.findMany({
    where: { receiverId: userId },
    orderBy: { date: "desc" },
  });

  return notifications;
};

const deleteNotifications = async (userId: string, ids: string[]) => {
  const result = await prisma.notification.deleteMany({
    where: {
      receiverId: userId,
      id: {
        in: ids,
      },
    },
  });
  return result;
};

export const notificationService = {
  createNotification,
  getNotifications,
  deleteNotifications,
};
