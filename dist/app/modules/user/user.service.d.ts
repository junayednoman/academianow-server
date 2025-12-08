import { Prisma, User } from "@prisma/client";
import { TSignUpInput } from "./user.validation";
import { TOptions } from "../../utils/paginationCalculation";
export declare const userServices: {
    userSignUp: (payload: TSignUpInput) => Promise<{
        phone: string | null;
        email: string;
        name: string;
        signUpSource: import(".prisma/client").$Enums.SignUpSource | null;
        practiceTime: string;
        subjectId: string;
        bookId: string;
        level: import(".prisma/client").$Enums.UserLevel;
        schoolLevel: import(".prisma/client").$Enums.UserSchoolLevel;
        age: number | null;
        avatarId: string | null;
        activeQuestionId: string | null;
        activeLessonId: string | null;
        coins: number;
        hearts: number;
        xp: number;
        id: string;
        lastHeartReset: Date;
        currentStreak: number;
        lastPracticeDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllUsers: (query: Record<string, any>, options: TOptions) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        users: {
            status: import(".prisma/client").$Enums.UserStatus;
            user: {
                email: string;
                name: string;
                signUpSource: import(".prisma/client").$Enums.SignUpSource | null;
                age: number | null;
                createdAt: Date;
                avatar: {
                    icon: string;
                } | null;
            } | null;
            id: string;
            subscription: {
                status: import(".prisma/client").$Enums.SubscriptionStatus;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                authId: string;
                trialEnds: Date;
                subscriptionEndsAt: Date;
            } | null;
        }[];
    }>;
    getSingleUser: (id: string) => Promise<{
        user: {
            phone: string | null;
            email: string;
            name: string;
            signUpSource: import(".prisma/client").$Enums.SignUpSource | null;
            practiceTime: string;
            subjectId: string;
            bookId: string;
            level: import(".prisma/client").$Enums.UserLevel;
            schoolLevel: import(".prisma/client").$Enums.UserSchoolLevel;
            age: number | null;
            avatarId: string | null;
            activeQuestionId: string | null;
            activeLessonId: string | null;
            coins: number;
            hearts: number;
            xp: number;
            id: string;
            lastHeartReset: Date;
            currentStreak: number;
            lastPracticeDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } | null>;
    getProfile: (email: string) => Promise<{
        rank: number;
        book: {
            name: string;
            id: string;
            subject: {
                name: string;
                id: string;
            };
        };
        avatar: {
            icon: string;
        } | null;
        activeQuestion: {
            id: string;
        } | null;
        activeLesson: {
            name: string;
            id: string;
            chapter: {
                name: string;
                id: string;
            };
        } | null;
        phone: string | null;
        email: string;
        name: string;
        signUpSource: import(".prisma/client").$Enums.SignUpSource | null;
        practiceTime: string;
        subjectId: string;
        bookId: string;
        level: import(".prisma/client").$Enums.UserLevel;
        schoolLevel: import(".prisma/client").$Enums.UserSchoolLevel;
        age: number | null;
        avatarId: string | null;
        activeQuestionId: string | null;
        activeLessonId: string | null;
        coins: number;
        hearts: number;
        xp: number;
        id: string;
        lastHeartReset: Date;
        currentStreak: number;
        lastPracticeDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile: (email: string, payload: Partial<User>) => Promise<{
        phone: string | null;
        email: string;
        name: string;
        signUpSource: import(".prisma/client").$Enums.SignUpSource | null;
        practiceTime: string;
        subjectId: string;
        bookId: string;
        level: import(".prisma/client").$Enums.UserLevel;
        schoolLevel: import(".prisma/client").$Enums.UserSchoolLevel;
        age: number | null;
        avatarId: string | null;
        activeQuestionId: string | null;
        activeLessonId: string | null;
        coins: number;
        hearts: number;
        xp: number;
        id: string;
        lastHeartReset: Date;
        currentStreak: number;
        lastPracticeDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateLastPracticeDate: (email: string, payload: {
        streakFreeze: boolean;
    }) => Promise<{
        phone: string | null;
        email: string;
        name: string;
        signUpSource: import(".prisma/client").$Enums.SignUpSource | null;
        practiceTime: string;
        subjectId: string;
        bookId: string;
        level: import(".prisma/client").$Enums.UserLevel;
        schoolLevel: import(".prisma/client").$Enums.UserSchoolLevel;
        age: number | null;
        avatarId: string | null;
        activeQuestionId: string | null;
        activeLessonId: string | null;
        coins: number;
        hearts: number;
        xp: number;
        id: string;
        lastHeartReset: Date;
        currentStreak: number;
        lastPracticeDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | undefined>;
    getUserRanking: () => Promise<{
        name: string;
        xp: number;
        avatar: {
            icon: string;
        } | null;
    }[]>;
    deleteUser: (email: string) => Promise<Prisma.BatchPayload>;
    updateActiveLessonId: (activeLessonId: string, email: string) => Promise<{
        phone: string | null;
        email: string;
        name: string;
        signUpSource: import(".prisma/client").$Enums.SignUpSource | null;
        practiceTime: string;
        subjectId: string;
        bookId: string;
        level: import(".prisma/client").$Enums.UserLevel;
        schoolLevel: import(".prisma/client").$Enums.UserSchoolLevel;
        age: number | null;
        avatarId: string | null;
        activeQuestionId: string | null;
        activeLessonId: string | null;
        coins: number;
        hearts: number;
        xp: number;
        id: string;
        lastHeartReset: Date;
        currentStreak: number;
        lastPracticeDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map