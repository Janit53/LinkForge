import { createClient } from "redis";

export const redisClient = createClient();

redisClient.on("error", err => {
    console.log("Redis Client Error", err);
});

export const connectCache = async () => {
    await redisClient.connect();
};