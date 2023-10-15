import { body, param, validationResult } from "express-validator";
import { isValidObjectId } from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/customError.js";
import { JOB_STATUS, JOB_TYPE, USER_ROLE } from "../utils/constants.js";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

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

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation")
    .notEmpty()
    .withMessage("company is required")
    .isLength({ min: 5 })
    .withMessage("location must be least 5 characters"),
  body("jobStatus").isIn(Object.values(JOB_STATUS)).withMessage("invalid status value"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("invalid type value"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async id => {
    const isValidId = isValidObjectId(id);
    if (!isValidId) throw new Error("invalid MongoDB id");
    const job = await Job.findById(id);
    if (!job) throw new Error(`no job with id: ${id}`);
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async email => {
      const isExistUser = await User.findOne({ email });
      if (isExistUser) {
        throw new Error("user already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8, max: 16 })
    .withMessage("password must be least 8 characters"),
  body("location").notEmpty().withMessage("location is required"),
]);
