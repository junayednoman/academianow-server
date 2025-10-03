import { Subject } from "../../../../generated/prisma";
import { TFile } from "../../interface/file.interface";
import ApiError from "../../middlewares/classes/ApiError";
import { deleteFromS3, uploadToS3 } from "../../utils/awss3";
import prisma from "../../utils/prisma";

const createSubject = async (payload: Subject, file: TFile) => {
  if (!file) throw new ApiError(400, "Image is required!");
  const existing = await prisma.subject.findUnique({
    where: { name: payload.name },
  });

  if (existing)
    throw new ApiError(400, "Subject with this name already exists!");

  const existingIndex = await prisma.subject.findUnique({
    where: { index: payload.index },
  });

  if (existingIndex)
    throw new ApiError(400, "Subject with this index already exists!");

  payload.image = await uploadToS3(file);
  return prisma.subject.create({ data: payload });
};

const getAllSubjects = async () => {
  return prisma.subject.findMany({
    orderBy: { index: "asc" },
  });
};

const getSingleSubject = async (id: string) => {
  const result = await prisma.subject.findUnique({ where: { id } });
  return result;
};

const updateSubject = async (
  id: string,
  payload: Partial<Subject>,
  file?: TFile
) => {
  const subject = await prisma.subject.findUniqueOrThrow({ where: { id } });

  if (payload.name) {
    const existing = await prisma.subject.findUnique({
      where: { name: payload.name },
    });
    if (existing && existing.id !== id) {
      throw new ApiError(400, "Another subject already exists with this name!");
    }
  }

  if (payload.index) {
    const existing = await prisma.subject.findUnique({
      where: { index: payload.index },
    });
    if (existing && existing.id !== id) {
      throw new ApiError(
        400,
        "Another subject already exists with this index!"
      );
    }
  }

  if (file) payload.image = await uploadToS3(file);

  const result = await prisma.subject.update({
    where: { id },
    data: payload,
  });

  if (result && payload.image && subject.image) {
    await deleteFromS3(subject.image);
  }

  return result;
};

const deleteSubject = async (id: string) => {
  const subject = await prisma.subject.findUniqueOrThrow({ where: { id } });

  const associatedBooks = await prisma.book.findFirst({
    where: { subjectId: id },
  });
  if (associatedBooks)
    throw new ApiError(400, "Subject is associated with books!");

  const result = await prisma.subject.delete({ where: { id } });

  if (result && subject.image) {
    await deleteFromS3(subject.image);
  }

  return result;
};

export const subjectServices = {
  createSubject,
  getAllSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubject,
};
