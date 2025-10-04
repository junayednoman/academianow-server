import { Response } from "express";
import { questionServices } from "./question.service";
import { sendResponse } from "../../utils/sendResponse";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
import { TRequest } from "../../interface/global.interface";

const createQuestion = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await questionServices.createQuestion(req.body);
    sendResponse(res, {
      message: "Question created successfully!",
      data: result,
    });
  }
);

const getQuestionsByLesson = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await questionServices.getQuestionsByLesson(
      req.params.lessonId as string
    );
    sendResponse(res, {
      message: "Questions fetched successfully!",
      data: result,
    });
  }
);

const getSingleQuestion = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await questionServices.getSingleQuestion(
      req.params.id as string
    );
    sendResponse(res, {
      message: "Question fetched successfully!",
      data: result,
    });
  }
);

const updateQuestion = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await questionServices.updateQuestion(
      req.params.id as string,
      req.body
    );
    sendResponse(res, {
      message: "Question updated successfully!",
      data: result,
    });
  }
);

const deleteQuestion = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await questionServices.deleteQuestion(
      req.params.id as string
    );
    sendResponse(res, {
      message: "Question deleted successfully!",
      data: result,
    });
  }
);

const deleteImageFromQuestion = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await questionServices.deleteImageFromQuestion(
      req.params.id as string,
      req.body.image
    );
    sendResponse(res, {
      message: "Question image deleted successfully!",
      data: result,
    });
  }
);

export const questionController = {
  createQuestion,
  getQuestionsByLesson,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
  deleteImageFromQuestion,
};
