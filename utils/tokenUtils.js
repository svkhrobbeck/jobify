import jwt from "jsonwebtoken";
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

export const createJwt = payload => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return token;
};

export const verifyJwt = token => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
};
