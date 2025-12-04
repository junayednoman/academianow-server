import { Book } from "@prisma/client";
import { TFile } from "../../interface/file.interface";
export declare const bookServices: {
    createBook: (payload: Book, file: TFile) => Promise<{
        name: string;
        subjectId: string;
        id: string;
        image: string;
    }>;
    getAllBooksBySubjectId: (subjectId: string) => Promise<({
        subject: {
            name: string;
            id: string;
            index: number;
            image: string;
        };
    } & {
        name: string;
        subjectId: string;
        id: string;
        image: string;
    })[]>;
    getSingleBook: (id: string) => Promise<({
        subject: {
            name: string;
            id: string;
            index: number;
            image: string;
        };
    } & {
        name: string;
        subjectId: string;
        id: string;
        image: string;
    }) | null>;
    updateBook: (id: string, payload: Partial<Book>, file?: TFile) => Promise<{
        subject: {
            name: string;
            id: string;
            index: number;
            image: string;
        };
    } & {
        name: string;
        subjectId: string;
        id: string;
        image: string;
    }>;
    deleteBook: (id: string) => Promise<{
        name: string;
        subjectId: string;
        id: string;
        image: string;
    }>;
};
//# sourceMappingURL=book.service.d.ts.map