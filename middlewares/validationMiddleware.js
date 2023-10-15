import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customError.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import { isValidObjectId } from "mongoose";
import Job from "../models/jobModel.js";

const withValidationErrors = validateValues => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);

        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateCreateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation")
    .optional()
    .isLength({ min: 5, max: 50 })
    .withMessage("location must be between 5 and 50 characters"),
  body("jobStatus").optional().isIn(Object.values(JOB_STATUS)).withMessage("invalid status value"),
  body("jobType").optional().isIn(Object.values(JOB_TYPE)).withMessage("invalid type value"),
]);

export const validateEditJobInput = withValidationErrors([
  body("company").optional().notEmpty().withMessage("company can't be empty string"),
  body("position").optional().notEmpty().withMessage("position can't be empty string"),
  body("jobLocation")
    .optional()
    .notEmpty()
    .withMessage("location can't be empty string")
    .isLength({ min: 5, max: 50 })
    .withMessage("location must be between 5 and 50 characters"),
  body("jobStatus").optional().isIn(Object.values(JOB_STATUS)).withMessage("invalid status value"),
  body("jobType").optional().isIn(Object.values(JOB_TYPE)).withMessage("invalid type value"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async id => {
    const isValidId = isValidObjectId(id);
    if (!isValidId) throw new Error("invalid MongoDB id");
    const job = await Job.findById(id);
    if (!job) throw new Error(`no job with id: ${id}`);
  }),
]);
