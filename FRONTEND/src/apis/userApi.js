import { dotEnvConfig } from "../config/conf"

const registerUserApi = async (name, email, password) => {
    const URL = dotEnvConfig.domainUrl + "/api/user/register";

    const response = await fetch(URL, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Registration failed");
    }
    return data;

}

const loginUserApi = async (email, password) => {
    // console.log("in frontend", email, password)
    try {
        const URL = dotEnvConfig.domainUrl + "/api/user/login";
        const response = await fetch(URL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        console.log(response)

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null
    }

}

const logoutUserApi = async () => {
    const URL = dotEnvConfig.domainUrl + "/api/user/logout";

    const response = await fetch(URL, {
        method: "POST",
        credentials: "include"
    });

    const data = await response.json();
    return data;
};

const getUserApi = async () => {

    try {
        const URL = dotEnvConfig.domainUrl + "/api/user/current-user"

        const response = await fetch(URL, {
            method: "GET",
            credentials: "include"
        })

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();

        console.log("getUserApi", data);

        if (data)
            return data;
        else {
            return null;
        }
    } catch (error) {
        console.log(error.message);
    }

}

export { registerUserApi, loginUserApi, logoutUserApi, getUserApi }