import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../../generated/prisma";
import { PrismaClientKnownRequestError } from "../../../generated/prisma/runtime/library";
import config from "../config";
import ApiError from "./classes/ApiError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = 500;
  let success = false;
  let message = "Something went wrong!";
  let error = err;
  let stack = err.stack;

  if (err instanceof Prisma.PrismaClientValidationError) {
    status = 422;
    message = "Validation error!";
    error = err.message;
  } else if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      message = `${err.meta?.modelName === "Auth" ? "User" : err.meta?.modelName} already exists with this ${
        (err.meta?.target as string[] | number[])[0]
      }!`;
      error = err.meta;
    } else if (err.code === "P2025") {
      status = 404;
      message = `${err.meta?.modelName === "Auth" ? "User" : err.meta?.modelName} not found!`;
      error = err.meta;
    }
  } else if (err.name === "ZodError") {
    status = 422;
    // const msgs = err?.issues?.map(
    //   (issue: { message: string }) => issue.message
    // );
    // const msg = msgs.join(", ");

    message =  err.issues[0]?.message || "Validation error!";
    error = err.issues;
  } else if (err instanceof ApiError) {
    status = err.statusCode;
    message = err.message;
  } else if (err.name === "JsonWebTokenError") {
    status = 401;
    message = err?.message;
  } else if (err.name === "TokenExpiredError") {
    status = 401;
    message = err?.message;
  } else if (err.name === "MulterError") {
    status = 400;
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      message = err?.message;
      err = [
        {
          path: "",
          message: err?.message,
        },
      ];
    }
  }

  // send error response
  res.status(status).json({
    success,
    message,
    error,
    stack: config.env === "development" ? stack : undefined,
  });
};

export default globalErrorHandler;
