import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { validateLoginInput, validateRegisterInput } from "../middlewares/validationMiddleware.js";

const router = Router();

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);

export default router;
