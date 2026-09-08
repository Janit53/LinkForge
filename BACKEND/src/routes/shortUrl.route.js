import { Router } from "express";
import { createCustomUrlController, createShortUrlController, checkSlugExistsController, getShortUrlByUserIdController, deleteShortUrlController } from "../controllers/shortUrl.controller.js";
import { userAuthMiddleware } from "../middlewares/userAuthMiddleware.js";
import { shortUrlCreationRateLimiter } from "../middlewares/redisRateLimiter.middleware.js";

const router = Router();

router.post("/create", shortUrlCreationRateLimiter, createShortUrlController)

router.post("/create/customurl", shortUrlCreationRateLimiter, userAuthMiddleware, createCustomUrlController)

router.get("/check/:slug", userAuthMiddleware, checkSlugExistsController)

router.get("/getshorturls/:userid", userAuthMiddleware, getShortUrlByUserIdController)

router.get("/deleteshorturl/:slug", userAuthMiddleware, deleteShortUrlController)

router.post("/create/bulkshorturl", userAuthMiddleware)

export default router;

