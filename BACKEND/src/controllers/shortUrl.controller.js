import {
    createCustomUrlService,
    findOrgUrlFromShortUrlService,
    createShortUrlService,
    checkShortUrlExistsService,
    getShortUrlInCacheService,
    setShortUrlInCacheService
} from "../services/shortUrl.services.js";
import { AppError, NotFoundError } from "../utils/errorHandler.js";
import { wrapAsync } from "../utils/tryCatchWrapper.js";
import { getDefaultExpiryDate } from "../utils/helper.js";

const createShortUrlController = async (req, res, next) => {
    // we can remove try catch from here, the same thing happens behind the scenes by the express
    // When to use try catch
    // when Only if we want to do something with the error before letting it continue, like console.log(err)
    // augment ai - solves error problem, it goes through the code base and tlls where the problem lies.
    try {
        const { url, expiresAt } = req.body;

        let defaultExpiryDate;
        if (!expiresAt) {
            defaultExpiryDate = getDefaultExpiryDate();
        }

        let shortUrlId;

        if (req.user) {
            shortUrlId = await createShortUrlService(url, req.user._id, defaultExpiryDate);
        }
        else {
            shortUrlId = await createShortUrlService(url, null, defaultExpiryDate);
        }

        return res
            .status(201)
            .json({
                "shorturl": process.env.APP_URL + '/' + shortUrlId
            });
    }
    catch (err) {
        console.log("createShortUrlController error::")
        console.log(err.message);
        next(err);
    }
}

const createCustomUrlController = async (req, res) => {
    const { url, slug, expiresAt } = req.body;

    let defaultExpiryDate;
    if (!expiresAt) {
        defaultExpiryDate = getDefaultExpiryDate();
    }

    let shortUrlId;
    if (req.user) {
        shortUrlId = await createCustomUrlService(url, req.user._id, slug, expiresAt);
    } else {
        throw new AppError(401, "User login required!");
    }

    return res
        .status(201)
        .json({
            "shorturl": process.env.APP_URL + '/' + shortUrlId
        });

}

const redirectFromShortUrlController = wrapAsync(async (req, res) => {

    const id = req.params.id;
    let orgUrl = await getShortUrlInCacheService(id);

    if (!orgUrl) {
        orgUrl = await findOrgUrlFromShortUrlService(id);
        await setShortUrlInCacheService(id, orgUrl);
    }
    if (!orgUrl) {
        orgUrl = await checkArchivesShortUrlService(id);
        if (!orgUrl) {
            throw new NotFoundError("Short URL doesn't exist")
        }
        throw new NotFoundError("Short URL is expired");
    }

    res.redirect(orgUrl);
})

const checkSlugExistsController = async (req, res) => {
    const { slug } = req.params;
    const response = await checkShortUrlExistsService(slug);

    if (response)
        res.status(200).json({
            success: true,
            slugExists: response
        })
    else {
        res.status(200).json({
            success: true,
            slugExists: response
        })
    }
}

const createShortUrlsInBulkController = async (req, res) => {
    return null
}

export {
    createShortUrlController,
    createCustomUrlController,
    redirectFromShortUrlController,
    checkSlugExistsController,
    createShortUrlsInBulkController
};