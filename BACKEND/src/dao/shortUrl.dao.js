import { shortUrl } from "../models/shorturl.model.js";
import { ConflictError } from "../utils/errorHandler.js";
import { redisClient } from "../config/redis.config.js";

const saveShortUrl = async (short_url, original_url, userId, expiresAt) => {
    try {
        const newUrl = new shortUrl({
            originalUrl: original_url,
            shortUrl: short_url,
            expiresAt: expiresAt
        })

        if (userId) {
            newUrl.user = userId;
        }

        await newUrl.save();
    }
    catch (err) {
        console.log("whole ERROR:: ", err);
        console.log("err.message ::", err.message);
        if (err.code == 11000) throw new ConflictError("Short URL already exists");

        throw new Error(err.message);
    }
}

const getDataFromShortUrlDao = async (short_url) => {
    const data = await shortUrl.findOneAndUpdate({ shortUrl: short_url },
        {
            $inc: {
                clicks: 1
            },
            $set: {
                lastAccessedAt: new Date(),
                status: "active"
            }
        });
    return data;
}

const getDataFromShortUrlNotForUserDao = async (short_url) => {
    const data = await shortUrl.findOne({ shortUrl: short_url });
    return data;
}

const checkShortUrlExistsDao = async (short_url) => {
    const data = await shortUrl.find({ shortUrl: short_url });
    return data.length > 0;
}

const expiredByDateUrlsStatusUpdateDao = async (expiryDays) => {
    let expiryDaysAgoDate = new Date();
    expiryDaysAgoDate.setDate(expiryDaysAgoDate.getDate() - expiryDays)

    const expiredUrls = await shortUrl.updateMany({
        $or: [{
            expiresAt: {
                $lte: new Date(),
                $ne: null
            }
        }, {
            lastAccessedAt: {
                $lte: expiryDaysAgoDate
            }
        }]
    }, {
        $set: {
            status: "expired"
        }
    })

    return true;
}

const getExpiredUrlsDao = async () => {
    const expiredUrls = await shortUrl.find({
        status: {
            $eq: "expired"
        }
    })

    return expiredUrls;
}

const deleteExpiredUrlsDao = async () => {
    await shortUrl.deleteMany({
        status: "expired"
    });

    return true;
}

const updateStatusToInactiveDao = async (inactivityDaysAgoDate) => {
    const inactiveUrls = await shortUrl.updateMany({
        lastAccessedAt: {
            $lte: inactivityDaysAgoDate
        },
        status: {
            $nin: ["inactive", "expired"]
        }
    }, {
        $set: {
            status: "inactive"
        }
    });

    return inactiveUrls;
}

const updateStatusToExpiredDao = async (expiryDaysAgoDate) => {

    const expiredUrls = await shortUrl.updateMany({
        lastAccessedAt: {
            $lte: expiryDaysAgoDate
        },
        status: {
            $ne: "expired"
        }
    }, {
        $set: {
            status: "expired"
        }
    });

    return expiredUrls;
}

const setIntoCache = async (slug, orgUrl) => {
    await redisClient.set(slug, orgUrl, {
        EX: 3600
    });
    return true;
};

const checkCacheDao = async (slug) => {
    const data = await redisClient.get(slug);

    if (!data) return null;

    return data;
}

const getShortUrlByUserIdDao = async (userId) => {
    const data = await shortUrl.find({
        user: userId
    });

    if (data.length == 0) return null;

    return data;
}

const deleteShortUrlDao = async (slug) => {
    await shortUrl.deleteOne({
        shortUrl: slug
    })

    return true;
}

export {
    saveShortUrl,
    getDataFromShortUrlDao,
    getDataFromShortUrlNotForUserDao,
    checkShortUrlExistsDao,
    expiredByDateUrlsStatusUpdateDao,
    getExpiredUrlsDao,
    deleteExpiredUrlsDao,
    updateStatusToInactiveDao,
    updateStatusToExpiredDao,
    checkCacheDao,
    setIntoCache,
    getShortUrlByUserIdDao,
    deleteShortUrlDao
}