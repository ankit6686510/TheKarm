import jwt from "jsonwebtoken";

/**
 * Authentication middleware
 * Verifies the JWT token from cookies and sets the user ID in the request
 */
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }
        
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }
        
        // Set userId in request for use in route handlers
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Authentication failed",
            success: false
        });
    }
};

export default isAuthenticated;