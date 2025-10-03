import { Book } from "../../../../generated/prisma";
import { TFile } from "../../interface/file.interface";
import ApiError from "../../middlewares/classes/ApiError";
import { deleteFromS3, uploadToS3 } from "../../utils/awss3";
import prisma from "../../utils/prisma";

const createBook = async (payload: Book, file: TFile) => {
  if (!file) throw new ApiError(400, "Image is required!");

  const existing = await prisma.book.findUnique({
    where: { name: payload.name },
  });
  if (existing) throw new ApiError(400, "Book with this name already exists!");

  await prisma.subject.findUniqueOrThrow({
    where: { id: payload.subjectId },
  });

  payload.image = await uploadToS3(file);
  return prisma.book.create({ data: payload });
};

const getAllBooks = async () => {
  return prisma.book.findMany({
    include: { subject: true },
    orderBy: { name: "asc" },
  });
};

const getSingleBook = async (id: string) => {
  return prisma.book.findUnique({
    where: { id },
    include: { subject: true },
  });
};

const updateBook = async (id: string, payload: Partial<Book>, file?: TFile) => {
  const book = await prisma.book.findUniqueOrThrow({ where: { id } });

  if (payload.name) {
    const existing = await prisma.book.findUnique({
      where: { name: payload.name },
    });
    if (existing && existing.id !== id) {
      throw new ApiError(400, "Another book already exists with this name!");
    }
  }

  if (payload.subjectId) {
    await prisma.subject.findUniqueOrThrow({
      where: { id: payload.subjectId },
    });
  }

  if (file) payload.image = await uploadToS3(file);

  const result = await prisma.book.update({
    where: { id },
    data: payload,
    include: { subject: true },
  });

  if (result && payload.image && book.image) {
    await deleteFromS3(book.image);
  }

  return result;
};

const deleteBook = async (id: string) => {
  const book = await prisma.book.findUniqueOrThrow({ where: { id } });
  
  const result = await prisma.book.delete({ where: { id } });

  if (result && book.image) {
    await deleteFromS3(book.image);
  }

  return result;
};

export const bookServices = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
