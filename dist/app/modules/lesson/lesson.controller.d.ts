import { Response } from "express";
export declare const lessonController: {
    createLesson: (req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getLessonsByChapter: (req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getSingleLesson: (req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updateLesson: (req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deleteLesson: (req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=lesson.controller.d.ts.map