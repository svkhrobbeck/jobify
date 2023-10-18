import { body, param, validationResult } from "express-validator";
import { isValidObjectId } from "mongoose";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/customError.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
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
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").trim().notEmpty().withMessage("company is required"),
  body("position").trim().notEmpty().withMessage("position is required"),
  body("jobLocation")
    .trim()
    .notEmpty()
    .withMessage("company is required")
    .isLength({ min: 5 })
    .withMessage("location must be at least 5 characters long"),
  body("jobStatus").isIn(Object.values(JOB_STATUS)).withMessage("invalid status value"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("invalid type value"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (id, { req }) => {
    const isValidId = isValidObjectId(id);
    if (!isValidId) throw new Error("invalid MongoDB id");

    const job = await Job.findById(id);
    if (!job) throw new Error(`no job with id: ${id}`);

    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createdBy.toString();

    if (!isAdmin && !isOwner) {
      throw new Error("not authorized to access this route");
    }
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").trim().notEmpty().withMessage("name is required"),
  body("lastName").trim().notEmpty().withMessage("lastName is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async email => {
      const user = await User.findOne({ email });
      if (user) throw new Error("user already exists");
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  body("location").trim().notEmpty().withMessage("location is required"),
]);

export const validateLoginInput = withValidationErrors([
  body("email").notEmpty().withMessage("email is required").isEmail().withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").trim().notEmpty().withMessage("name is required"),
  body("lastName").trim().notEmpty().withMessage("lastName is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async email => {
      const user = await User.findOne({ email });
      if (user && user._id !== req.user.userId) throw new Error("user already exists");
    }),
  body("location").trim().notEmpty().withMessage("location is required"),
]);
