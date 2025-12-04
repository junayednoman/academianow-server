import { Subject } from "@prisma/client";
import { TFile } from "../../interface/file.interface";
export declare const subjectServices: {
    createSubject: (payload: Subject, file: TFile) => Promise<{
        name: string;
        id: string;
        index: number;
        image: string;
    }>;
    getAllSubjects: () => Promise<{
        name: string;
        id: string;
        index: number;
        image: string;
    }[]>;
    getSingleSubject: (id: string) => Promise<{
        name: string;
        id: string;
        index: number;
        image: string;
    } | null>;
    updateSubject: (id: string, payload: Partial<Subject>, file?: TFile) => Promise<{
        name: string;
        id: string;
        index: number;
        image: string;
    }>;
    deleteSubject: (id: string) => Promise<{
        name: string;
        id: string;
        index: number;
        image: string;
    }>;
};
//# sourceMappingURL=subject.service.d.ts.map