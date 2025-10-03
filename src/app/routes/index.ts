import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { adminRoutes } from "../modules/admin/admin.routes";
import { avatarRoutes } from "../modules/avatar/avatar.routes";
import { subjectRoutes } from "../modules/subject/subject.routes";

const router = Router();

const routes = [
  { path: "/users", route: userRoutes },
  { path: "/auths", route: authRoutes },
  { path: "/admins", route: adminRoutes },
  { path: "/avatars", route: avatarRoutes },
  { path: "/subjects", route: subjectRoutes },
];

routes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
