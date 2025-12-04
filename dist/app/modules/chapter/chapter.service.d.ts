import { Chapter } from "@prisma/client";
export declare const chapterServices: {
    createChapter: (payload: Chapter) => Promise<{
        name: string;
        bookId: string;
        id: string;
        index: number;
    }>;
    getChaptersByBookId: (bookId: string) => Promise<({
        book: {
            name: string;
            subjectId: string;
            id: string;
            image: string;
        };
    } & {
        name: string;
        bookId: string;
        id: string;
        index: number;
    })[]>;
    getSingleChapter: (id: string) => Promise<{
        book: {
            name: string;
            subjectId: string;
            id: string;
            image: string;
        };
    } & {
        name: string;
        bookId: string;
        id: string;
        index: number;
    }>;
    updateChapter: (id: string, payload: Partial<Chapter>) => Promise<{
        name: string;
        bookId: string;
        id: string;
        index: number;
    }>;
    deleteChapter: (id: string) => Promise<{
        name: string;
        bookId: string;
        id: string;
        index: number;
    }>;
};
//# sourceMappingURL=chapter.service.d.ts.map