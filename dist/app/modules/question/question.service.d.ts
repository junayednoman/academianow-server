import { Question } from "@prisma/client";
export declare const questionServices: {
    createQuestion: (payload: Question) => Promise<{
        type: import(".prisma/client").$Enums.QuestionType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        index: number;
        explanation: string;
        lessonId: string;
        images: string[];
        words: string[];
        correctAnswer: string;
    }>;
    getQuestionsByLesson: (lessonId: string) => Promise<{
        type: import(".prisma/client").$Enums.QuestionType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        index: number;
        explanation: string;
        lessonId: string;
        images: string[];
        words: string[];
        correctAnswer: string;
    }[]>;
    getSingleQuestion: (id: string) => Promise<{
        type: import(".prisma/client").$Enums.QuestionType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        index: number;
        explanation: string;
        lessonId: string;
        images: string[];
        words: string[];
        correctAnswer: string;
    } | null>;
    updateQuestion: (id: string, payload: Partial<Question>) => Promise<{
        type: import(".prisma/client").$Enums.QuestionType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        index: number;
        explanation: string;
        lessonId: string;
        images: string[];
        words: string[];
        correctAnswer: string;
    }>;
    deleteQuestion: (id: string) => Promise<void>;
    deleteImageFromQuestion: (id: string, image: string) => Promise<{
        type: import(".prisma/client").$Enums.QuestionType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        index: number;
        explanation: string;
        lessonId: string;
        images: string[];
        words: string[];
        correctAnswer: string;
    }>;
};
//# sourceMappingURL=question.service.d.ts.map