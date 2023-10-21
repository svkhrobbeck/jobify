import { Router } from "express";
import { deleteUser, getApplicationStats, getCurrentUser, updateUser } from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middlewares/validationMiddleware.js";
import { authorizePermissions, checkForTestUser } from "../middlewares/authMiddleware.js";
import { uploadAvatarMiddleware } from "../middlewares/uploadMiddleware.js";

const router = Router();
const avatarSize = 0.5 * Math.pow(1024, 2);

router.get("/current-user", getCurrentUser);
router.patch("/update-user", checkForTestUser, uploadAvatarMiddleware(avatarSize), validateUpdateUserInput, updateUser);
// router.delete("/delete-user", deleteUser);
router.get("/admin/statistics", [authorizePermissions("admin"), getApplicationStats]);

export default router;
