import { Question } from "../../../../generated/prisma";
import ApiError from "../../middlewares/classes/ApiError";
import { deleteFromS3 } from "../../utils/awss3";
import prisma from "../../utils/prisma";

const createQuestion = async (payload: Question) => {
  // Ensure lesson exists
  await prisma.lesson.findUniqueOrThrow({
    where: { id: payload.lessonId },
  });

  // Ensure unique index per lesson
  const existingIndex = await prisma.question.findFirst({
    where: {
      index: payload.index,
      lessonId: payload.lessonId,
    },
  });
  if (existingIndex)
    throw new ApiError(400, "Question with this index already exists!");
  return prisma.question.create({ data: payload });
};

const getQuestionsByLesson = async (lessonId: string) => {
  return await prisma.question.findMany({
    where: { lessonId },
    orderBy: { index: "asc" },
  });
};

const getSingleQuestion = async (id: string) => {
  return await prisma.question.findUnique({ where: { id } });
};

const updateQuestion = async (id: string, payload: Partial<Question>) => {
  const question = await prisma.question.findUniqueOrThrow({ where: { id } });

  if (
    (question.type === "IMAGE" && payload.type === "SENTENCE") ||
    (question.type === "IMAGE" && payload.words?.length) ||
    (question.type === "SENTENCE" && payload.type === "IMAGE") ||
    (question.type === "SENTENCE" && payload.images?.length)
  ) {
    throw new ApiError(400, "Cannot change question type!");
  }

  if (payload.index) {
    const existingIndex = await prisma.question.findFirst({
      where: {
        index: payload.index,
        lessonId: payload.lessonId || question.lessonId,
      },
    });
    if (existingIndex && existingIndex.id !== id)
      throw new ApiError(400, "Question with this index already exists!");
  }

  return prisma.question.update({ where: { id }, data: payload });
};

const deleteImageFromQuestion = async (id: string, image: string) => {
  const question = await prisma.question.findUniqueOrThrow({ where: { id } });
  await deleteFromS3(image);
  const images = question.images.filter(i => i !== image);
  return prisma.question.update({
    where: { id },
    data: {
      images: images,
    },
  });
};

const deleteQuestion = async (id: string) => {
  const result = await prisma.question.delete({ where: { id } });
  if (result && result.type === "IMAGE") {
    for (const image of result.images) {
      await deleteFromS3(image);
    }
  }
};

export const questionServices = {
  createQuestion,
  getQuestionsByLesson,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
  deleteImageFromQuestion,
};
