import { Router } from "express";
import { createJob, deleteJob, editJob, getAllJobs, getSingleJob } from "../controllers/jobController.js";
import { validateIdParam, validateJobInput } from "../middlewares/validationMiddleware.js";
const router = Router();

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(validateIdParam, getSingleJob)
  .patch(validateIdParam, validateJobInput, editJob)
  .delete(validateIdParam, deleteJob);

export default router;
