import jwt from 'jsonwebtoken';
import { jwtAccessTokenOptions, jwtRefreshTokenOptions } from '../config/jwt.config.js';

const createJwtToken = async (payload, secretKey, jwtOptions = {}) => {
    const token = await jwt.sign(
        payload,
        secretKey,
        jwtOptions
    )
    return token;
}

const createAccessToken = async (payload) => {
    const token = await jwt.sign(
        payload,
        process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY
        }
    )
    return token;
}

const createRefreshToken = async (payload) => {
    const token = await jwt.sign(
        payload,
        process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY
        }
    )
    return token;
}

const decodeAccessToken = async (token) => {
    return await jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY)
}

export { createJwtToken, createAccessToken, createRefreshToken, decodeAccessToken };