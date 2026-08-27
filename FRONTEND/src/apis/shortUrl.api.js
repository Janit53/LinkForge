import { dotEnvConfig } from "../config/conf";

const createShortUrlApi = async (url, slug = "", expiresAt = null) => {

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
                expiresAt: expiresAt
            })
        });

        console.log(response.status)

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

export { createShortUrlApi, checkSlugExistsApi };