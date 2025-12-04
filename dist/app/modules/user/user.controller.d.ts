import { Request, Response } from "express";
export declare const userController: {
    userSignUp: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getAllUsers: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getSingleUser: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getProfile: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updateProfile: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updateLastPracticeDate: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getUserRanking: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deleteUser: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=user.controller.d.ts.map