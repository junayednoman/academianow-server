import { UserRole } from "../../../generated/prisma";
import { Request } from "express";

export type TAuthUser = {
  id: string;
  email: string;
  role: UserRole;
};

export type TRequest = Request & {
  user?: TAuthUser;
};
