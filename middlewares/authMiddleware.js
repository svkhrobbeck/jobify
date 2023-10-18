import { UnauthenticatedError, UnauthorizedError } from "../errors/customError.js";
import { verifyJwt } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("invalid authentication");

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
