import { Response } from "express";
export declare const bookController: {
    createBook: (req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getAllBooksBySubjectId: (req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getSingleBook: (req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updateBook: (req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deleteBook: (req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=book.controller.d.ts.map