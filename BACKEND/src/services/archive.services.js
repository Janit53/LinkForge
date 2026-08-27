import { getDataFromArchivesDao, deleteArchivedShortUrlDao } from "../dao/archive.dao.js"

const checkArchivesShortUrlExistsService = async (short_url) => {
    const data = await getDataFromArchivesDao(short_url);

    if (!data) {
        throw new AppError(404, "Short Url doesnot exist in Archives");
    }

    return data.length > 0;

}

const deleteArchivedShortUrlService = async (short_url) => {
    await deleteArchivedShortUrlDao(short_url);
    return true;
}

export { checkArchivesShortUrlExistsService, deleteArchivedShortUrlService };