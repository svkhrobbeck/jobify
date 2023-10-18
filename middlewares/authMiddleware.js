import { UnauthenticatedError } from "../errors/customError.js";
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
