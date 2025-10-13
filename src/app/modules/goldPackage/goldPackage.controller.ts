import { Response } from "express";
import { goldPackageServices } from "./goldPackage.service";
import handleAsyncRequest from "../../utils/handleAsyncRequest";
import { sendResponse } from "../../utils/sendResponse";
import { TRequest } from "../../interface/global.interface";

const createGoldPackage = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await goldPackageServices.createGoldPackage(req.body);
    sendResponse(res, { message: "Gold package created!", data: result });
  }
);

const getAllGoldPackages = handleAsyncRequest(
  async (_req: TRequest, res: Response) => {
    const result = await goldPackageServices.getAllGoldPackages();
    sendResponse(res, { message: "Gold packages fetched!", data: result });
  }
);

const getSingleGoldPackage = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const result = await goldPackageServices.getSingleGoldPackage(
      req.params.id as string
    );
    sendResponse(res, { message: "Gold packages fetched!", data: result });
  }
);

const updateGoldPackage = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const { id } = req.params;
    const result = await goldPackageServices.updateGoldPackage(
      id as string,
      req.body
    );
    sendResponse(res, { message: "Gold package updated!", data: result });
  }
);

const deleteGoldPackage = handleAsyncRequest(
  async (req: TRequest, res: Response) => {
    const { id } = req.params;
    const result = await goldPackageServices.deleteGoldPackage(id as string);
    sendResponse(res, { message: "Gold package deleted!", data: result });
  }
);

export const goldPackageController = {
  createGoldPackage,
  getAllGoldPackages,
  getSingleGoldPackage,
  updateGoldPackage,
  deleteGoldPackage,
};
