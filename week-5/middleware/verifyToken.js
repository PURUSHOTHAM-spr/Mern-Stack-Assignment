import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const verifyToken = async (req, res, next) => {

    // read token from cookies
    const token = req.cookies.token;
    console.log("token:", token);

    if (!token) {
        return res.status(401).json({ message: "unauthorized request, please login" });
    }
    try {
        // verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decodedToken:", decodedToken);

        // optionally attach user info to request
        req.user = decodedToken;

        next();
    } catch (err) {
        return res.status(401).json({ message: "invalid or expired token" });
    }
};
