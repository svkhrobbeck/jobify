import { Router } from "express";
import { getApplicationStats, getCurrentUser, updateUser } from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middlewares/validationMiddleware.js";
import { authorizePermissions } from "../middlewares/authMiddleware.js";
import { uploadAvatarMiddleware } from "../middlewares/uploadMiddleware.js";

const router = Router();
const avatarSize = 5 * Math.pow(1024, 2);

router.get("/current-user", getCurrentUser);
router.patch("/update-user", uploadAvatarMiddleware(avatarSize), validateUpdateUserInput, updateUser);
router.get("/admin/statistics", [authorizePermissions("admin"), getApplicationStats]);

export default router;
