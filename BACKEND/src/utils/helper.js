import { nanoid } from "nanoid"
import cron from 'node-cron';
import { expiredByDateShortUrlStatusManagementService, regularStatusMonitoringService } from "../services/shortUrl.services.js";

export const generateNanoId = (length) => {
    return nanoid(length);
}

export const expireShortUrl = cron.schedule(
    '0 0 0 L * *',
    async () => {
        try {
            console.log("Short URL status management started");

            await shortUrlStatusManagementService();

            console.log("Short URL status management completed");
        } catch (error) {
            console.error("Short URL status management failed:", error);
        }
    },
    {
        name: "monthly-monitor"
    }
);

export const monitorShortUrl = cron.schedule(
    '0 0 23 * * *',
    async () => {
        try {
            console.log("Short URL status management started");

            const expiryDays = Number(process.env.EXPIRY_DAYS)
            const inactivityDays = Number(process.env.INACTIVITY_DAYS)
            await regularStatusMonitoringService(inactivityDays, expiryDays);

            console.log("Short URL status management completed");
        } catch (error) {
            console.error("Short URL status management failed:", error);
        }
    }
)

export const getDefaultExpiryDate = () => {
    let defaultExpiryDate = new Date();
    defaultExpiryDate.setDate(defaultExpiryDate.getDate() + 7)

    return defaultExpiryDate;
}