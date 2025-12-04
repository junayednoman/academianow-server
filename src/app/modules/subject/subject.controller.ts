import { Response } from "express";
import { subjectServices } from "./subject.service";
import { sendResponse } from "../../utils/sendResponse";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
import { TRequest } from "../../interface/global.interface";
import { TFile } from "../../interface/file.interface";

const createSubject = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await subjectServices.createSubject(
      req.body,
      req.file as TFile
    );
    sendResponse(res, {
      message: "Subject created successfully!",
      data: result,
    });
  }
);

const getAllSubjects = handleAsyncRequest(
  async (_req: TRequest, res: Response) => {
    const result = await subjectServices.getAllSubjects();
    sendResponse(res, {
      message: "Subjects fetched successfully!",
      data: result,
    });
  }
);

const getSingleSubject = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await subjectServices.getSingleSubject(
      req.params.id as string
    );
    sendResponse(res, {
      message: "Subject fetched successfully!",
      data: result,
    });
  }
);

const updateSubject = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const { id } = req.params;
    const result = await subjectServices.updateSubject(
      id as string,
      req.body,
      req.file as TFile
    );
    sendResponse(res, {
      message: "Subject updated successfully!",
      data: result,
    });
  }
);

const deleteSubject = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const { id } = req.params;
    const result = await subjectServices.deleteSubject(id as string);
    sendResponse(res, {
      message: "Subject deleted successfully!",
      data: result,
    });
  }
);

export const subjectController = {
  createSubject,
  getAllSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubject,
};
