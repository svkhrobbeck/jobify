import { Router } from "express";
import { getApplicationStats, getCurrentUser, updateUser } from "../controllers/userController.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.patch("/update-user", updateUser);
router.get("/admin/statistics", getApplicationStats);

export default router;
