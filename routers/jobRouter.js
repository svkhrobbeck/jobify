import { Router } from "express";
import { createJob, deleteJob, editJob, getAllJobs, getSingleJob } from "../controllers/jobController.js";
import { validateJobInput } from "../middlewares/validationMiddleware.js";
const router = Router();

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router.route("/:id").get(getSingleJob).patch(validateJobInput, editJob).delete(deleteJob);

export default router;
