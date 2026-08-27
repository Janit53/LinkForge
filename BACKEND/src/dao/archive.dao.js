import { archivedShortUrl } from "../models/archives.model.js";
import { shortUrl } from "../models/shorturl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

const saveArchShortUrlDao = async (docs) => {
    await archivedShortUrl.insertMany(docs);
    return true;
}

const getDataFromArchivesDao = async (short_url) => {
    const data = await archivedShortUrl.find({ shortUrl: short_url })
    return data
}

const deleteArchivedShortUrlDao = async (short_url) => {
    await archivedShortUrl.deleteOne({
        shortUrl: short_url
    })
    return true;
}

export { saveArchShortUrlDao, getDataFromArchivesDao, deleteArchivedShortUrlDao };