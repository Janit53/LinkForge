import { dotEnvConfig } from "../config/conf";

const createShortUrlApi = async (url, userId = "", slug = "", expiresAt = null) => {

    let URL = `${dotEnvConfig.domainUrl}/api/shorturl/create` + (slug ? `/customurl` : ``);

    try {
        const response = await fetch(URL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: url,
                slug: slug,
                expiresAt: expiresAt,
                userId: userId
            })
        });

        // console.log(response.status)

        if (response.status == 429) {
            console.log("Yo", response)
            throw new Error("Too many requests, wait for a minute.")
        }

        const { shorturl } = await response.json();
        return {
            success: true,
            data: shorturl
        };
    }
    catch (err) {
        console.log(err.message);

        return {
            success: false,
            data: err.message
        };
    }
}

const checkSlugExistsApi = async (slug) => {
    try {
        const response = await fetch(`${dotEnvConfig.domainUrl}/api/shorturl/check/${slug}`, {
            method: "GET",
            credentials: "include"
        })

        const data = await response.json();

        return data.slugExists

    } catch (err) {
        console.log(err.message);
        return null;
    }
}

const getShortUrlsOfUserApi = async (userId) => {
    try {
        const URL = `${dotEnvConfig.domainUrl}/api/shorturl/getshorturls/${userId}`;

        const response = await fetch(URL, {
            method: "GET",
            credentials: "include"
        })

        const { data } = await response.json();

        console.log(data)

        return data;
    } catch (err) {
        console.log(err.message);
        return null;
    }
}

const deleteShortUrlApi = async (shortUrl) => {
    try {
        const URL = `${dotEnvConfig.domainUrl}/api/shorturl/deleteshorturl/${shortUrl}`

        const response = await fetch(URL, {
            method: "GET",
            credentials: "include"
        })

        if (response.ok) {
            return true;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}

export {
    createShortUrlApi,
    checkSlugExistsApi,
    getShortUrlsOfUserApi,
    deleteShortUrlApi
};