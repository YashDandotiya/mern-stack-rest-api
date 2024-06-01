const User = require('../models/user');

const userfetch = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, 'username email _id');
    } catch (error) {
        return res.status(500).json({ message: 'Fetching failed, please try again.' }); // Change 1
    }
    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const usersignup = async (req, res, next) => {
    const { username, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        return res.status(500).json({ message: 'Fetching user details failed, please try again later.' }); // Change 2
    }
    if (existingUser) {
        return res.status(401).json({ message: 'User already exists with this email.' }); // Change 3
    }
    const createdUser = new User({
        username: username,
        email: email,
        password: password
    });
    try {
        await createdUser.save();
    } catch (error) {
        return res.status(422).json({ message: 'Registering user failed, please try again.' }); // Change 4
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const userlogin = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        return res.status(500).json({ message: 'Unexpected error occurred, please try again.' }); // Change 5
    }
    if (!existingUser || existingUser.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials, please try again.' }); // Change 6
    }
    res.json({ user: existingUser.toObject({ getters: true }) });
};

exports.userfetch = userfetch;
exports.usersignup = usersignup;
exports.userlogin = userlogin;
