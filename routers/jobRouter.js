import { Router } from "express";
import { createJob, deleteJob, editJob, getAllJobs, getSingleJob } from "../controllers/jobController.js";
import { validateIdParam, validateCreateJobInput, validateEditJobInput } from "../middlewares/validationMiddleware.js";
const router = Router();

router.route("/").get(getAllJobs).post(validateCreateJobInput, createJob);
router
  .route("/:id")
  .get(validateIdParam, getSingleJob)
  .patch(validateIdParam, validateEditJobInput, editJob)
  .delete(validateIdParam, deleteJob);

export default router;
