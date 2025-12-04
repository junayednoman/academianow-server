"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const avatar_routes_1 = require("../modules/avatar/avatar.routes");
const subject_routes_1 = require("../modules/subject/subject.routes");
const book_routes_1 = require("../modules/book/book.routes");
const chapter_routes_1 = require("../modules/chapter/chapter.routes");
const lesson_routes_1 = require("../modules/lesson/lesson.routes");
const question_routes_1 = require("../modules/question/question.routes");
const uploadFile_routes_1 = require("../modules/uploadFile/uploadFile.routes");
const goldPackage_routes_1 = require("../modules/goldPackage/goldPackage.routes");
const legal_routes_1 = require("../modules/legal/legal.routes");
const router = (0, express_1.Router)();
const routes = [
    { path: "/users", route: user_routes_1.userRoutes },
    { path: "/auths", route: auth_routes_1.authRoutes },
    { path: "/admins", route: admin_routes_1.adminRoutes },
    { path: "/avatars", route: avatar_routes_1.avatarRoutes },
    { path: "/subjects", route: subject_routes_1.subjectRoutes },
    { path: "/books", route: book_routes_1.bookRoutes },
    { path: "/chapters", route: chapter_routes_1.chapterRoutes },
    { path: "/lessons", route: lesson_routes_1.lessonRoutes },
    { path: "/questions", route: question_routes_1.questionRoutes },
    { path: "/upload-files", route: uploadFile_routes_1.fileRoutes },
    { path: "/gold-packages", route: goldPackage_routes_1.goldPackageRoutes },
    { path: "/legal", route: legal_routes_1.legalRoutes },
];
routes.forEach(route => {
    router.use(route.path, route.route);
});
exports.default = router;
//# sourceMappingURL=index.js.map