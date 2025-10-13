import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { adminRoutes } from "../modules/admin/admin.routes";
import { avatarRoutes } from "../modules/avatar/avatar.routes";
import { subjectRoutes } from "../modules/subject/subject.routes";
import { bookRoutes } from "../modules/book/book.routes";
import { chapterRoutes } from "../modules/chapter/chapter.routes";
import { lessonRoutes } from "../modules/lesson/lesson.routes";
import { questionRoutes } from "../modules/question/question.routes";
import { fileRoutes } from "../modules/uploadFile/uploadFile.routes";
import { goldPackageRoutes } from "../modules/goldPackage/goldPackage.routes";

const router = Router();

const routes = [
  { path: "/users", route: userRoutes },
  { path: "/auths", route: authRoutes },
  { path: "/admins", route: adminRoutes },
  { path: "/avatars", route: avatarRoutes },
  { path: "/subjects", route: subjectRoutes },
  { path: "/books", route: bookRoutes },
  { path: "/chapters", route: chapterRoutes },
  { path: "/lessons", route: lessonRoutes },
  { path: "/questions", route: questionRoutes },
  { path: "/upload-files", route: fileRoutes },
  { path: "/gold-packages", route: goldPackageRoutes },
];

routes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
