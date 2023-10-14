import { body, param, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customError.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import { isValidObjectId } from "mongoose";

const withValidationErrors = validateValues => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").optional().isLength({ min: 5 }).withMessage("location must be at least 5 characters"),
  body("jobStatus").optional().isIn(Object.values(JOB_STATUS)).withMessage("invalid status value"),
  body("jobType").optional().isIn(Object.values(JOB_TYPE)).withMessage("invalid type value"),
]);
