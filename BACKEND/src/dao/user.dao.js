import { User } from "../models/user.model.js"

const createNewUserDao = async (name, email, password) => {

    // creating User
    const newUser = new User({
        name: name,
        email: email,
        password: password
    })
    await newUser.save();

    return newUser;
}

const getUserByEmailDao = async (email) => {
    const user = await User.findOne({
        email: email
    })
    return user;
}

const getUserByIdDao = async (id) => {
    const user = await User.findById({ _id: id })
    return user;
}

// update user
// delete user

export { createNewUserDao, getUserByEmailDao, getUserByIdDao };