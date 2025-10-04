import { Response } from "express";
import { lessonServices } from "./lesson.service";
import { sendResponse } from "../../utils/sendResponse";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
import { TRequest } from "../../interface/global.interface";
import { TFile } from "../../interface/file.interface";

const createLesson = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await lessonServices.createLesson(
      req.body,
      req.file as TFile
    );
    sendResponse(res, {
      message: "Lesson created successfully!",
      data: result,
    });
  }
);

const getLessonsByChapter = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await lessonServices.getLessonsByChapter(
      req.params.chapterId as string
    );
    sendResponse(res, {
      message: "Lessons fetched successfully!",
      data: result,
    });
  }
);

const getSingleLesson = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await lessonServices.getSingleLesson(
      req.params.id as string
    );
    sendResponse(res, {
      message: "Lesson fetched successfully!",
      data: result,
    });
  }
);

const updateLesson = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await lessonServices.updateLesson(
      req.params.id as string,
      req.body,
      req.file as TFile
    );
    sendResponse(res, {
      message: "Lesson updated successfully!",
      data: result,
    });
  }
);

const deleteLesson = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await lessonServices.deleteLesson(req.params.id as string);
    sendResponse(res, {
      message: "Lesson deleted successfully!",
      data: result,
    });
  }
);

export const lessonController = {
  createLesson,
  getLessonsByChapter,
  getSingleLesson,
  updateLesson,
  deleteLesson,
};
