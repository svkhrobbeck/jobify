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
  param("id")
    .custom(id => isValidObjectId(id)) // true or false
    .withMessage("invalid MongoDB id"),
]);
