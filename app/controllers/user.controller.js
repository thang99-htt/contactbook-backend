const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const jwt = require('jsonwebtoken');

// Register a new User
exports.register = async(req, res, next) => {
    if (!req.body?.name || !req.body?.email || !req.body?.password) {
        return next(new ApiError(400, "Field can not be empty"));
    }
    try {
        const userService = new UserService(MongoDB.client);
        const user_existed = await userService.findByEmail(req.body.email);

        if(user_existed)
            return next(new ApiError(404, "User existed."));
        else {
            const user = await userService.register(req.body);
            return res.send(user);
        }

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while register")
        );
    }
};

// Find a single user with an id
exports.findOne = async(req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const user = await userService.findByEmail(req.params.email);
        if (!user) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send(user);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving user with email=${req.params.email}`
            )
        );
    }
};

// Login
exports.login = async(req, res, next) => {
    if (!req.body?.email || !req.body?.password) {
        return next(new ApiError(400, "Field can not be empty."));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const user = await userService.findByEmail(req.body.email);
        // const token = jwt.sign({ id: user._id }, 'privateKey');
        if (!user) {
            return next(new ApiError(404, "User not found."));
        }
        if(req.body.password == user.password)
            // return res.send({user, token});
            return res.send(user);
        else 
            return res.send({ message: "Email or password is invalid."});
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error login with email=${req.body.email}`
            )
        );
    }
};

// Logout
exports.logout = (req, res) => {
    res.send({ message: "Logout handler" });
};
