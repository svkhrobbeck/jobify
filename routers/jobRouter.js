import { Router } from "express";
import { createJob, deleteJob, editJob, getAllJobs, getSingleJob, showStats } from "../controllers/jobController.js";
import { validateIdParam, validateJobInput } from "../middlewares/validationMiddleware.js";
import { checkForTestUser } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/").get(getAllJobs).post(validateJobInput, checkForTestUser, createJob);

router.route("/data/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getSingleJob)
  .patch(checkForTestUser, validateIdParam, validateJobInput, editJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
