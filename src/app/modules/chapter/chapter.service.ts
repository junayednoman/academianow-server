import { Chapter } from "@prisma/client";
import prisma from "../../utils/prisma";
import ApiError from "../../middlewares/classes/ApiError";

const createChapter = async (payload: Chapter) => {
  const existingIndex = await prisma.chapter.findFirst({
    where: {
      index: payload.index,
      bookId: payload.bookId,
    },
  });
  if (existingIndex)
    throw new ApiError(400, "Chapter with this index already exists!");

  const existingName = await prisma.chapter.findFirst({
    where: {
      name: payload.name,
      bookId: payload.bookId,
    },
  });
  if (existingName)
    throw new ApiError(400, "Chapter with this name already exists!");

  return prisma.chapter.create({ data: payload });
};

const getChaptersByBookId = async (bookId: string) => {
  return prisma.chapter.findMany({
    where: {
      bookId,
    },
    orderBy: { index: "asc" },
    include: { book: true },
  });
};

const getSingleChapter = async (id: string) => {
  return prisma.chapter.findUniqueOrThrow({
    where: { id },
    include: { book: true },
  });
};

const updateChapter = async (id: string, payload: Partial<Chapter>) => {
  const chapter = await prisma.chapter.findUniqueOrThrow({ where: { id } });
  if (payload.index) {
    const existingIndex = await prisma.chapter.findFirst({
      where: {
        index: payload.index,
        bookId: payload.bookId || chapter.bookId,
      },
    });
    if (existingIndex)
      throw new ApiError(400, "Chapter with this index already exists!");
  }

  if (payload.name) {
    const existingName = await prisma.chapter.findFirst({
      where: {
        name: payload.name,
        bookId: payload.bookId || chapter.bookId,
      },
    });
    if (existingName)
      throw new ApiError(400, "Chapter with this name already exists!");
  }

  return prisma.chapter.update({
    where: { id },
    data: payload,
  });
};

const deleteChapter = async (id: string) => {
  return prisma.chapter.delete({ where: { id } });
};

export const chapterServices = {
  createChapter,
  getChaptersByBookId,
  getSingleChapter,
  updateChapter,
  deleteChapter,
};
