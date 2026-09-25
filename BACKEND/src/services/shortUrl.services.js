import { saveArchShortUrlDao } from "../dao/archive.dao.js";
import {
    saveShortUrl,
    getShortUrlByUserIdDao,
    getDataFromShortUrlDao,
    checkShortUrlExistsDao,
    expiredByDateUrlsStatusUpdateDao,
    getExpiredUrlsDao,
    deleteExpiredUrlsDao,
    updateStatusToInactiveDao,
    updateStatusToExpiredDao,
    checkCacheDao,
    setIntoCache,
    deleteShortUrlDao
} from "../dao/shortUrl.dao.js";
import { ConflictError } from "../utils/errorHandler.js";
import { generateNanoId } from "../utils/helper.js";
import { deleteArchivedShortUrlService } from "./archive.services.js";

const checkShortUrlExistsService = async (short_url) => {
    return await checkShortUrlExistsDao(short_url);
}

const createShortUrlService = async (url, userId = null, expiresAt) => {
    const nanoUrl = await generateNanoId(8);

    await deleteArchivedShortUrlService(nanoUrl);

    if (await checkShortUrlExistsDao(nanoUrl)) {
        throw new ConflictError("Short URL already taken!!")
    }

    if (!nanoUrl) throw new Error("Short URL creation service unavailable!")

    console.log(userId)

    if (userId) {
        await saveShortUrl(nanoUrl, url, userId, expiresAt);
    } else {
        await saveShortUrl(nanoUrl, url, null, expiresAt);
    }

    return nanoUrl;
}

// create custom short URL of no user: Service of no use ---------------------------------------------------------------------------------------------
const createCustomUrlWithoutUserService = async (url, slug, expiresAt) => {
    /* 
    Useless function this service should only be available for users who are logged in.
     */

    await deleteArchivedShortUrlService(slug);

    if (await checkShortUrlExistsService) {
        throw ConflictError("Short URL already taken!!")
    }

    await saveShortUrl(slug, url);

    return slug;
}

// create short URL of a user ---------------------------------------------------------------------------------------------
const createCustomUrlService = async (url, userId, slug, expiresAt) => {

    await deleteArchivedShortUrlService(slug);

    if (await checkShortUrlExistsService(slug)) {
        throw new ConflictError("Short URL already taken!!")
    }

    await saveShortUrl(slug, url, userId, expiresAt);

    return slug
}

// find the original url from short url
const findOrgUrlFromShortUrlService = async (short_url) => {
    const data = await getDataFromShortUrlDao(short_url);
    return data.originalUrl;
}

// Important - Function for managing expired URLs by "expiredAt" field
const expiredByDateShortUrlStatusManagementService = async () => {

    // 1. set status: "expire" to the expired urls
    const result = await expiredByDateUrlsStatusUpdateDao();

    if (!result) {
        console.log("status couldnt be updated :: at shortUrlStatusManagementService")
        return null;
    }

    // 2. get expired Urls
    const expiredUrls = await getExpiredUrlsDao();

    if (!expiredUrls || expiredUrls.length === 0) {
        console.log("Didn't get any expired URLs :: at shortUrlStatusManagementService");
        return null;
    }

    // 3. archive it - not related to dao
    const archivedUrls = expiredUrls.map(url => ({
        originalUrl: url.originalUrl,
        shortUrl: url.shortUrl,
        clicks: url.clicks,
        user: url.user,
        status: url.status,
        lastAccessedAt: url.lastAccessedAt,
        creationDate: url.createdAt,
        expiredAt: url.expiresAt
    }));

    // 4. insert into archives db 
    await saveArchShortUrlDao(archivedUrls);

    // 5. delete from shorturl DB
    await deleteExpiredUrlsDao();

    return ({
        message: "Success",
        ok: true
    })
}

const regularStatusMonitoringService = async (inactivityDays, expiryDays) => {

    // changing status to "inactive"
    let inactivityDaysAgoDate = new Date();
    inactivityDaysAgoDate.setDate(inactivityDaysAgoDate.getDate() - inactivityDays);

    let resInactive = await updateStatusToInactiveDao(inactivityDaysAgoDate);

    console.log(resInactive.modifiedCount, "statuses got Updated today to inactive")

    // changing status to "expired"
    let expiryDaysAgoDate = new Date();
    expiryDaysAgoDate.setDate(expiryDaysAgoDate.getDate() - expiryDays);

    let resExpiry = await updateStatusToExpiredDao(expiryDaysAgoDate);

    console.log(resExpiry.modifiedCount, "statuses got Updated today to expired")
}

const getShortUrlInCacheService = async (slug) => {
    const data = checkCacheDao(slug);
    if (!data) return null
    return data
}

const setShortUrlInCacheService = async (slug, originalUrl) => {
    await setIntoCache(slug, originalUrl);
    return true;
}

const getShortUrlByUserIdService = async (userId) => {
    const rawData = await getShortUrlByUserIdDao(userId);

    if (!rawData) return null;

    return rawData;
}

const deleteShortUrlService = async (slug) => {
    await deleteShortUrlDao(slug);
    return true;
}

export {
    checkShortUrlExistsService,
    createShortUrlService,
    createCustomUrlWithoutUserService,
    createCustomUrlService,
    findOrgUrlFromShortUrlService,
    expiredByDateShortUrlStatusManagementService,
    regularStatusMonitoringService,
    getShortUrlInCacheService,
    setShortUrlInCacheService,
    getShortUrlByUserIdService,
    deleteShortUrlService
};