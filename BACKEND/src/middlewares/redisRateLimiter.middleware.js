import { redisClient } from "../config/redis.config.js";

export const shortUrlCreationRateLimiter = async (req, res, next) => {
    const ip = req.ip;
    const key = `rateLimit:${ip}`;

    const count = await redisClient.incr(key);

    if (count === 1) {
        await redisClient.expire(key, 60);
    }

    const MAX_REQS = Number(process.env.RATELIMITER_MAX_ALLOWED_REQ);

    if (count > MAX_REQS) {
        return res.status(429).json({
            message: "Too many requests. Try again later."
        });
    }

    next();
};