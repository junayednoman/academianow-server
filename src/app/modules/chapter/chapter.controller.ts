import { Response } from "express";
import { chapterServices } from "./chapter.service";
import { sendResponse } from "../../utils/sendResponse";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
import { TRequest } from "../../interface/global.interface";

const createChapter = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await chapterServices.createChapter(req.body);
    sendResponse(res, {
      message: "Chapter created successfully!",
      data: result,
    });
  }
);

const getChaptersByBookId = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await chapterServices.getChaptersByBookId(
      req.params.bookId as string
    );
    sendResponse(res, {
      message: "Chapters fetched successfully!",
      data: result,
    });
  }
);

const getSingleChapter = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await chapterServices.getSingleChapter(
      req.params.id as string
    );
    sendResponse(res, {
      message: "Chapter fetched successfully!",
      data: result,
    });
  }
);

const updateChapter = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await chapterServices.updateChapter(
      req.params.id as string,
      req.body
    );
    sendResponse(res, {
      message: "Chapter updated successfully!",
      data: result,
    });
  }
);

const deleteChapter = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await chapterServices.deleteChapter(req.params.id as string);
    sendResponse(res, {
      message: "Chapter deleted successfully!",
      data: result,
    });
  }
);

export const chapterController = {
  createChapter,
  getChaptersByBookId,
  getSingleChapter,
  updateChapter,
  deleteChapter,
};
