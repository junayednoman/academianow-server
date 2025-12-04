import { Response } from "express";
export declare const questionController: {
    createQuestion: (req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getQuestionsByLesson: (req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getSingleQuestion: (req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updateQuestion: (req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deleteQuestion: (req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deleteImageFromQuestion: (req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=question.controller.d.ts.map