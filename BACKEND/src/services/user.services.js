import { User } from "../models/user.model.js";
import { createNewUserDao, getUserByEmailDao, getUserByIdDao } from "../dao/user.dao.js";

const registerUserService = async (name, email, password) => {
    const existedUser = await getUserByEmailDao(email);
    if (existedUser) {
        throw new AppError(409, "User with this email or username already exists");
    }

    const newUser = await createNewUserDao(name, email, password);

    return newUser;
}

const getUserByEmailService = async (email) => {
    const user = await getUserByEmailDao(email);
    if (!user) return null;

    return user;
}

const getUserByIdService = async (id) => {
    const user = await getUserByIdDao(id);
    if (!user) return null;

    return user;
}

const logOutUserService = async (id) => {
    const user = await User.findByIdAndUpdate(id, {
        $unset: {
            refreshToken: 1
        }
    }, {
        new: true
    })

    return user;

}



export { registerUserService, getUserByEmailService, getUserByIdService, logOutUserService };