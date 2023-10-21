import { BadRequestError, UnauthenticatedError, UnauthorizedError } from "../errors/customError.js";
import { verifyJwt } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new UnauthenticatedError("invalid authentication");

  const [access, token] = authorization.split(" ");
  const isValidAuth = (access !== "Token" && access !== "Bearer") || !token;

  if (isValidAuth) throw new UnauthenticatedError("invalid authentication");

  try {
    const { userId, role } = verifyJwt(token);
    req.user = { userId, role };
    next();
  } catch (err) {
    throw new UnauthenticatedError("invalid authentication");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("not authorized to access this route");
    }
    next();
  };
};
