import { Lesson } from "../../../../generated/prisma";
import { TFile } from "../../interface/file.interface";
import ApiError from "../../middlewares/classes/ApiError";
import { deleteFromS3, uploadToS3 } from "../../utils/awss3";
import prisma from "../../utils/prisma";

const createLesson = async (payload: Lesson, file: TFile) => {
  if (!file) throw new ApiError(400, "Explanation is required!");

  const existingIndex = await prisma.lesson.findFirst({
    where: {
      index: payload.index,
      chapterId: payload.chapterId,
    },
  });
  if (existingIndex)
    throw new ApiError(400, "Lesson with this index already exists!");

  const existingName = await prisma.lesson.findFirst({
    where: {
      name: payload.name,
      chapterId: payload.chapterId,
    },
  });
  if (existingName)
    throw new ApiError(400, "Lesson with this name already exists!");

  await prisma.chapter.findUniqueOrThrow({
    where: { id: payload.chapterId },
  });

  payload.explanation = await uploadToS3(file);
  return prisma.lesson.create({ data: payload });
};

const getLessonsByChapter = async (chapterId: string) => {
  return await prisma.lesson.findMany({
    where: {
      chapterId,
    },
    orderBy: { index: "asc" },
  });
};

const getSingleLesson = async (id: string) => {
  return await prisma.lesson.findUnique({ where: { id } });
};

const updateLesson = async (
  id: string,
  payload: Partial<Lesson>,
  file?: TFile
) => {
  const lesson = await prisma.lesson.findUniqueOrThrow({ where: { id } });
  if (!lesson) throw new ApiError(400, "Lesson not found!");

  if (payload.index) {
    const existingIndex = await prisma.lesson.findFirst({
      where: {
        index: payload.index,
        chapterId: payload.chapterId || lesson.chapterId,
      },
    });
    if (existingIndex && existingIndex.id !== id)
      throw new ApiError(400, "Lesson with this index already exists!");
  }

  if (payload.name) {
    const existingName = await prisma.lesson.findFirst({
      where: {
        name: payload.name,
        chapterId: payload.chapterId || lesson.chapterId,
      },
    });
    if (existingName && existingName.id !== id)
      throw new ApiError(400, "Lesson with this name already exists!");
  }

  if (file) payload.explanation = await uploadToS3(file);
  const result = await prisma.lesson.update({ where: { id }, data: payload });

  if (payload.explanation && result && lesson.explanation) {
    await deleteFromS3(lesson.explanation);
  }

  return result;
};

const deleteLesson = async (id: string) => {
  const result = await prisma.lesson.delete({ where: { id } });
  if (result) await deleteFromS3(result.explanation);
  return result;
};

export const lessonServices = {
  createLesson,
  getLessonsByChapter,
  getSingleLesson,
  updateLesson,
  deleteLesson,
};
