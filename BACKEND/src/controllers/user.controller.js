import { cookieOptions } from "../config/cookie.config.js";
import { User } from "../models/user.model.js";
import { createAccessToken, createRefreshToken } from "../services/jwt.services.js";
import { getUserByEmailService, logOutUserService, registerUserService } from "../services/user.services.js";
import { AppError, BadRequestError, ConflictError } from "../utils/errorHandler.js";

const userRegisterController = async (req, res) => {

    // fetching data from req
    const { name, email, password } = req.body;

    // checking the required fields
    if ([name, email, password].some((field) => field?.trim() === "")) {
        throw new AppError(400, "All fields are required!!!");
    }

    // checking the DB if the current user already exists or not
    const existedUser = await getUserByEmailService(email);
    if (existedUser) {
        throw new ConflictError("This email is already registered");
    }

    // creating the User
    const newUser = await registerUserService(name, email, password);

    // console.log(newUser);

    const payload = {
        id: newUser._id
    }

    // creating the access token
    const accessToken = await createAccessToken(payload);

    // creating the refresh token
    const refreshToken = await createRefreshToken(payload);

    req.user = newUser;

    return res
        .status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json({ success: true, message: "User signed up", user: newUser })
}

const userLoginController = async (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("email or password field not entered!!!");
    }

    const userExtracted = await getUserByEmailService(email);

    if (!userExtracted || password !== userExtracted.password) {
        throw new ConflictError("Invalid Credentials!!!");
    }

    const payload = {
        id: userExtracted._id
    }

    // creating the access token
    const accessToken = await createAccessToken(payload);

    // creating the refresh token
    const refreshToken = await createRefreshToken(payload);

    req.user = userExtracted;

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json({ success: true, message: "User logged in", user: userExtracted })
}

const userLogOutController = async (req, res) => {

    const user = await logOutUserService(req.user._id);

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json({ success: true, message: "Logged Out successfully" })
}

const getCurrentUserController = (req, res) => {
    return res
        .status(200)
        .json({
            success: true,
            user: req.user
        })
}

export { userRegisterController, userLoginController, userLogOutController, getCurrentUserController };