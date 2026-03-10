import jwt from "jsonwebtoken";

export const verifyToken = (roles = []) => {
  return (req, res, next) => {

    let token;

    // check Authorization header
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    // fallback to cookie
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        message: "Token missing"
      });
    }

    try {

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          message: "Access denied"
        });
      }

      next();

    } catch (err) {
      return res.status(401).json({
        message: "Invalid token"
      });
    }
  };
};