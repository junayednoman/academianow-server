import { GoldPackage } from "@prisma/client";
import prisma from "../../utils/prisma";

const createGoldPackage = async (payload: GoldPackage) => {
  const result = await prisma.goldPackage.create({ data: payload });
  return result;
};

const getAllGoldPackages = async () => {
  return await prisma.goldPackage.findMany({ orderBy: { price: "asc" } });
};

const getSingleGoldPackage = async (id: string) => {
  return await prisma.goldPackage.findUnique({ where: { id } });
};

const updateGoldPackage = async (id: string, payload: Partial<GoldPackage>) => {
  await prisma.goldPackage.findUniqueOrThrow({ where: { id } });
  const result = await prisma.goldPackage.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteGoldPackage = async (id: string) => {
  await prisma.goldPackage.findUniqueOrThrow({ where: { id } });
  const result = await prisma.goldPackage.delete({ where: { id } });
  return result;
};

export const goldPackageServices = {
  createGoldPackage,
  getAllGoldPackages,
  getSingleGoldPackage,
  updateGoldPackage,
  deleteGoldPackage,
};
