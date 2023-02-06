const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Register a new User
exports.register = (req, res) => {
    res.send({ message: "Register handler" });
};

// Find a single user with an id
exports.findOne = (req, res) => {
    res.send({ message: "findOne handler" });
};

// Find a single user with an email
exports.findOneEmail = (req, res) => {
    res.send({ message: "findOneEmail handler" });
};

// Update a user by the id in the request
exports.update = (req, res) => {
    res.send({ message: "Update handler" });
};

// Login
exports.login = (req, res) => {
    res.send({ message: "Login handler" });
};

// Logout
exports.logout = (req, res) => {
    res.send({ message: "Logout handler" });
};

