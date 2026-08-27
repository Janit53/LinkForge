import express from 'express';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import connectDB from './src/config/mongo.config.js';
import { connectCache } from './src/config/redis.config.js';
import shortUrlRoute from "./src/routes/shortUrl.route.js";
import { redirectFromShortUrlController } from './src/controllers/shortUrl.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';
import userRoute from './src/routes/user.route.js';
import cors from "cors";
import { createAccessToken, createRefreshToken } from './src/services/jwt.services.js';
import { jwtAccessTokenOptions } from './src/config/jwt.config.js';
import cookieParser from "cookie-parser";



const app = express();

dotenv.config("./.env");

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log("Hello world");
})

app.use('/api/shorturl', shortUrlRoute);

app.get("/:id", redirectFromShortUrlController);

app.use('/api/user', userRoute);

/////////////////////////////////////////////////////////////////////////
////////////////////////////// Test end point ///////////////////////////
/////////////////////////////////////////////////////////////////////////

// app.get("/api/refreshToken", async (req, res) => {
//     const token = await createRefreshToken({ _id: 23 })
//     res.status(200).json({ refreshToken: token })
// })

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// Error handler
app.use(errorHandler);

const startServer = async () => {
    await connectDB();
    await connectCache();

    app.listen(3000, () => {
        console.log("App listening on http://localhost:3000");
    });
};

startServer();