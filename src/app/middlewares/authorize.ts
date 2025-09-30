import { NextFunction, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken"
import config from "../../config";
import ApiError from "../classes/ApiError";
import { StatusCodes } from "http-status-codes";
import { TRequest } from "../../interface/global.interface";

const authorize = (...roles: string[]) => {
  return async (req: TRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      if (!token) throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized!")
      const decodedUser = jwt.verify(token, config.access_token_secret as Secret) as JwtPayload
      req.user = decodedUser

      if (roles.length && !roles.includes(decodedUser.role)) {
        throw new ApiError(StatusCodes.FORBIDDEN, "Forbidden!")
      }

      next()
    } catch (error: any) {
      next(error)
    }
  }
}

export default authorize;