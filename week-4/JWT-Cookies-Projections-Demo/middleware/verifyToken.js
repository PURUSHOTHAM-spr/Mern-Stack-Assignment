import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"

export function verifyToken(req, res, next) {
    //token verification logic
    //1.get token from req(using cookie-parser)
    let signedToken = req.cookies.token;
    if (!signedToken) {
        return res.status(401).json({message: "please login first"})
    }
    
    //2.verify token (decode)
    try {
        const decodeToken = jwt.verify(signedToken, "abcdef")
        console.log(decodeToken)
        req.user = decodeToken;
        next()
    } catch(err) {
        return res.status(401).json({message: "invalid token", reason: err.message})
    }
}