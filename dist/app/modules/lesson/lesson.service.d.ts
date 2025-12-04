import { Lesson } from "@prisma/client";
import { TFile } from "../../interface/file.interface";
export declare const lessonServices: {
    createLesson: (payload: Lesson, file: TFile) => Promise<{
        name: string;
        id: string;
        index: number;
        chapterId: string;
        explanation: string;
    }>;
    getLessonsByChapter: (chapterId: string, email: string) => Promise<{
        name: string;
        id: string;
        index: number;
        chapterId: string;
        explanation: string;
    }[]>;
    getSingleLesson: (id: string) => Promise<{
        name: string;
        id: string;
        index: number;
        chapterId: string;
        explanation: string;
    } | null>;
    updateLesson: (id: string, payload: Partial<Lesson>, file?: TFile) => Promise<{
        name: string;
        id: string;
        index: number;
        chapterId: string;
        explanation: string;
    }>;
    deleteLesson: (id: string) => Promise<{
        name: string;
        id: string;
        index: number;
        chapterId: string;
        explanation: string;
    }>;
};
//# sourceMappingURL=lesson.service.d.ts.map