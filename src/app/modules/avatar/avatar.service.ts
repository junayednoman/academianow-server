import { Avatar } from "../../../../generated/prisma";
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
};
