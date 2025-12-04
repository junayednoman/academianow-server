"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../../middlewares/classes/ApiError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateOTP_1 = __importDefault(require("../../utils/generateOTP"));
const sendEmail_1 = require("../../utils/sendEmail");
const paginationCalculation_1 = require("../../utils/paginationCalculation");
const user_constant_1 = require("./user.constant");
const date_fns_1 = require("date-fns");
const userSignUp = async (payload) => {
    const hashedPassword = await bcrypt_1.default.hash(payload.password, 10);
    const existingUser = await prisma_1.default.auth.findUnique({
        where: {
            email: payload.user.email,
            OR: [
                { status: client_1.UserStatus.ACTIVE },
                { status: client_1.UserStatus.BLOCKED },
                { status: client_1.UserStatus.DELETED },
            ],
        },
    });
    if (existingUser)
        throw new ApiError_1.default(400, "User already exists with this email!");
    await prisma_1.default.subject.findUniqueOrThrow({
        where: { id: payload.user.subjectId },
    });
    await prisma_1.default.book.findUniqueOrThrow({
        where: {
            id: payload.user.bookId,
            subjectId: payload.user.subjectId,
        },
    });
    const authData = {
        email: payload.user.email,
        password: hashedPassword,
        role: client_1.UserRole.USER,
    };
    const otp = (0, generateOTP_1.default)();
    const result = await prisma_1.default.$transaction(async (tn) => {
        await tn.auth.upsert({
            where: {
                email: payload.user.email,
            },
            update: authData,
            create: authData,
        });
        const result = await tn.user.upsert({
            where: { email: payload.user.email },
            update: payload.user,
            create: payload.user,
        });
        const hashedOtp = await bcrypt_1.default.hash(otp.toString(), 10);
        const otpExpires = new Date(Date.now() + 3 * 60 * 1000);
        const otpData = {
            email: payload.user.email,
            otp: hashedOtp,
            expires: otpExpires,
            attempts: 0,
        };
        await tn.otp.upsert({
            where: {
                email: payload.user.email,
            },
            update: otpData,
            create: otpData,
        });
        return result;
    });
    // sendEmail
    if (result) {
        const subject = "Complete your signup – verify your email";
        const replacements = {
            name: payload.user.name,
            otp,
        };
        const path = "./src/app/emailTemplates/welcome.html";
        (0, sendEmail_1.sendEmail)(payload.user.email, subject, path, replacements);
    }
    return result;
};
const getAllUsers = async (query, options) => {
    const { searchTerm, status, type } = query;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            user: {
                OR: user_constant_1.authSearchAbleFields.map(field => ({
                    [field]: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                })),
            },
        });
    }
    if (status) {
        andConditions.push({
            status: status,
        });
    }
    if (type) {
        if (type === "subscriber") {
            andConditions.push({
                NOT: {
                    subscription: null,
                },
            });
        }
    }
    else if (type === "non-subscriber") {
        andConditions.push({
            subscription: null,
        });
    }
    andConditions.push({
        role: client_1.UserRole.USER,
    });
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const { page, take, skip, sortBy, orderBy } = (0, paginationCalculation_1.calculatePagination)(options);
    const users = await prisma_1.default.auth.findMany({
        where: whereConditions,
        select: {
            id: true,
            status: true,
            subscription: true,
            user: {
                select: {
                    name: true,
                    email: true,
                    age: true,
                    signUpSource: true,
                    createdAt: true,
                    avatar: {
                        select: {
                            icon: true,
                        },
                    },
                },
            },
        },
        skip,
        take,
        orderBy: sortBy && orderBy ? { [sortBy]: orderBy } : { createdAt: "desc" },
    });
    const total = await prisma_1.default.auth.count({
        where: whereConditions,
    });
    const meta = {
        page,
        limit: take,
        total,
    };
    return { meta, users };
};
const getSingleUser = async (id) => {
    const user = await prisma_1.default.auth.findUnique({
        where: {
            id: id,
        },
        select: {
            user: true,
        },
    });
    return user;
};
const getProfile = async (email) => {
    const user = await prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: email,
        },
        include: {
            avatar: {
                select: {
                    icon: true,
                },
            },
            activeLesson: {
                select: {
                    id: true,
                    name: true,
                    chapter: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            activeQuestion: {
                select: {
                    id: true,
                },
            },
            book: {
                select: {
                    id: true,
                    name: true,
                    subject: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });
    // --- streak update logic ---
    const today = new Date();
    const diff = user.lastPracticeDate
        ? (0, date_fns_1.differenceInCalendarDays)(today, user.lastPracticeDate)
        : null;
    if (diff !== null) {
        if (diff === 1) {
            // consecutive day → increase streak
            user.currentStreak += 1;
        }
        else if (diff > 1) {
            // missed → reset streak
            user.currentStreak = 0;
        }
        // update DB only if streak changed
        if (diff >= 1) {
            await prisma_1.default.user.update({
                where: { email },
                data: {
                    lastPracticeDate: today,
                    currentStreak: user.currentStreak,
                },
            });
        }
    }
    const behindOf = await prisma_1.default.user.count({
        where: { xp: { gt: user.xp } },
    });
    // reset heart
    if (!user.lastHeartReset ||
        today.toDateString() !== user.lastHeartReset.toDateString()) {
        await prisma_1.default.user.update({
            where: { id: user.id },
            data: { hearts: 5, lastHeartReset: today },
        });
    }
    return { ...user, rank: behindOf + 1 };
};
const updateProfile = async (email, payload) => {
    if (payload.avatarId) {
        await prisma_1.default.avatar.findUniqueOrThrow({
            where: {
                id: payload.avatarId,
            },
        });
    }
    if (payload.activeLessonId) {
        await prisma_1.default.lesson.findUniqueOrThrow({
            where: {
                id: payload.activeLessonId,
            },
        });
    }
    if (payload.activeQuestionId) {
        await prisma_1.default.question.findUniqueOrThrow({
            where: {
                id: payload.activeQuestionId,
            },
        });
    }
    if (payload.bookId) {
        await prisma_1.default.book.findUniqueOrThrow({
            where: {
                id: payload.bookId,
            },
        });
    }
    if (payload.bookId) {
        await prisma_1.default.book.findUniqueOrThrow({
            where: {
                id: payload.bookId,
            },
        });
    }
    const user = await prisma_1.default.user.update({
        where: {
            email: email,
        },
        data: payload,
    });
    return user;
};
const updateLastPracticeDate = async (email, payload) => {
    const user = await prisma_1.default.user.findUniqueOrThrow({
        where: { email },
        select: {
            lastPracticeDate: true,
            currentStreak: true,
            coins: true,
        },
    });
    if (payload.streakFreeze && user.coins < 250)
        throw new ApiError_1.default(400, "You don't have enough coins to freeze your streak!");
    const today = new Date();
    const result = await prisma_1.default.$transaction(async (tn) => {
        if (!user.lastPracticeDate) {
            return await tn.user.update({
                where: { email },
                data: { lastPracticeDate: today, currentStreak: 1 },
            });
        }
        const diff = (0, date_fns_1.differenceInCalendarDays)(today, user.lastPracticeDate);
        if (diff === 0)
            return;
        if (diff === 1) {
            const updateData = {
                lastPracticeDate: today,
                currentStreak: user.currentStreak + 1,
            };
            if (payload?.streakFreeze) {
                updateData.coins = user.coins - 250;
            }
            return await tn.user.update({
                where: { email },
                data: updateData,
            });
        }
        return await tn.user.update({
            where: { email },
            data: { lastPracticeDate: today, currentStreak: 1 },
        });
    });
    return result;
};
const getUserRanking = async () => {
    const users = await prisma_1.default.user.findMany({
        orderBy: {
            xp: "desc",
        },
        take: 5,
        select: {
            name: true,
            avatar: {
                select: {
                    icon: true,
                },
            },
            xp: true,
        },
    });
    return users;
};
const deleteUser = async (email) => {
    const auth = await prisma_1.default.auth.findUniqueOrThrow({
        where: {
            email: email,
        },
    });
    const result = await prisma_1.default.$transaction(async (tn) => {
        await tn.otp.deleteMany({ where: { email } });
        await tn.subscription.deleteMany({ where: { authId: auth.id } });
        const user = await tn.user.deleteMany({ where: { email } });
        await tn.auth.deleteMany({ where: { email } });
        return user;
    });
    return result;
};
const updateActiveLessonId = async (activeLessonId, email) => {
    const result = await prisma_1.default.user.update({
        where: {
            email,
        },
        data: {
            activeLessonId,
        },
    });
    return result;
};
exports.userServices = {
    userSignUp,
    getAllUsers,
    getSingleUser,
    getProfile,
    updateProfile,
    updateLastPracticeDate,
    getUserRanking,
    deleteUser,
    updateActiveLessonId,
};
//# sourceMappingURL=user.service.js.map