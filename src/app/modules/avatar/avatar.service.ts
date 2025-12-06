import { Avatar } from "@prisma/client";
import { TFile } from "../../interface/file.interface";
import ApiError from "../../middlewares/classes/ApiError";
import { deleteFromS3, uploadToS3 } from "../../utils/awss3";
import prisma from "../../utils/prisma";

const createAvatar = async (payload: Avatar, file: TFile) => {
  if (!file) throw new ApiError(400, "Icon is required!");

  const existing = await prisma.avatar.findUnique({
    where: {
      index: payload.index,
    },
  });

  if (existing)
    throw new ApiError(400, "Avatar already exists with the index!");
  payload.icon = await uploadToS3(file);
  const result = await prisma.avatar.create({ data: payload });
  return result;
};

const getAllAvatars = async () => {
  const result = await prisma.avatar.findMany({
    orderBy: {
      index: "asc",
    },
  });
  return result;
};

const updateAvatar = async (
  id: string,
  payload: Partial<Avatar>,
  file?: TFile
) => {
  const avatar = await prisma.avatar.findUniqueOrThrow({
    where: {
      id: id,
    },
  });

  if (payload.index) {
    const existing = await prisma.avatar.findUnique({
      where: {
        index: payload.index,
      },
    });

    if (existing)
      throw new ApiError(400, "Avatar already exists with the index!");
  }

  if (file) payload.icon = await uploadToS3(file);
  const result = await prisma.avatar.update({
    where: {
      id: id,
    },
    data: payload,
  });

  if (result && payload.icon && avatar.icon) {
    await deleteFromS3(avatar.icon);
  }
  return result;
};

const purchaseAvatar = async (email: string, avatarId: string) => {
  const avatar = await prisma.avatar.findUniqueOrThrow({
    where: {
      id: avatarId,
    },
  });

  const auth = await prisma.auth.findUniqueOrThrow({
    where: {
      email: email,
    },
    select: {
      id: true,
      user: {
        select: {
          coins: true,
        },
      },
    },
  });

  if (auth.user && auth.user.coins < avatar.price) {
    throw new ApiError(400, "Not enough coins!");
  }

  const result = await prisma.$transaction(async tn => {
    const result = await tn.purchasedAvatar.create({
      data: {
        avatarId,
        authId: auth.id,
      },
    });

    await tn.user.update({
      where: {
        email: email,
      },
      data: {
        coins: { increment: -avatar.price },
      },
    });

    return result;
  });

  return result;
};

const getMyPurchasedAvatars = async (id: string) => {
  const result = await prisma.purchasedAvatar.findMany({
    where: {
      authId: id,
    },
    select: {
      avatar: {
        select: {
          id: true,
          icon: true,
          price: true,
        },
      },
    },
  });
  return result;
};

const deleteAvatar = async (id: string) => {
  const avatar = await prisma.avatar.findUniqueOrThrow({
    where: {
      id: id,
    },
  });

  const associatedUsers = await prisma.user.findFirst({
    where: {
      avatarId: id,
    },
  });

  if (associatedUsers)
    throw new ApiError(400, "Avatar is associated with a user!");

  const result = await prisma.avatar.delete({
    where: {
      id: id,
    },
  });

  if (result && avatar.icon) {
    await deleteFromS3(avatar.icon);
  }
  return result;
};

export const avatarServices = {
  createAvatar,
  getAllAvatars,
  updateAvatar,
  deleteAvatar,
  purchaseAvatar,
  getMyPurchasedAvatars,
};
