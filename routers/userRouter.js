import { Router } from "express";
import { getApplicationStats, getCurrentUser, updateUser } from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middlewares/validationMiddleware.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.patch("/update-user", validateUpdateUserInput, updateUser);
router.get("/admin/statistics", getApplicationStats);

export default router;
