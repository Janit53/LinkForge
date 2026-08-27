import { decodeAccessToken } from "../services/jwt.services.js";
import { getUserByIdService } from "../services/user.services.js";
import { AppError, BadRequestError } from "../utils/errorHandler.js"
import jwt from "jsonwebtoken";

const userAuthMiddleware = async (req, res, next) => {
    const token = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        throw new AppError(401, "Unauthorised request!!");
    }

    const decodedToken = await decodeAccessToken(token);

    const user = await getUserByIdService(decodedToken?.id)

    if (!user) {
        throw new AppError(401, "Unauthorized Access!!");
    }

    req.user = user;
    next();
}

export { userAuthMiddleware }