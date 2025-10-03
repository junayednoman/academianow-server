import { Response } from "express";
import { bookServices } from "./book.service";
import { sendResponse } from "../../utils/sendResponse";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
import { TRequest } from "../../interface/global.interface";
import { TFile } from "../../interface/file.interface";

const createBook = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const result = await bookServices.createBook(req.body, req.file as TFile);
  sendResponse(res, { message: "Book created successfully!", data: result });
});

const getAllBooks = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const result = await bookServices.getAllBooks();
  sendResponse(res, { message: "Books fetched successfully!", data: result });
});

const getSingleBook = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await bookServices.getSingleBook(req.params.id as string);
    sendResponse(res, { message: "Book fetched successfully!", data: result });
  }
);

const updateBook = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const { id } = req.params;
  const result = await bookServices.updateBook(
    id as string,
    req.body,
    req.file as TFile
  );
  sendResponse(res, { message: "Book updated successfully!", data: result });
});

const deleteBook = handleAsyncRequest(async (req: TRequest, res: Response) => {
  const { id } = req.params;
  const result = await bookServices.deleteBook(id as string);
  sendResponse(res, { message: "Book deleted successfully!", data: result });
});

export const bookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
