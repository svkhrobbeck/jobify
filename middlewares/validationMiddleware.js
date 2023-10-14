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

