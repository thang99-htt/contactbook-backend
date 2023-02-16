const { ObjectId } = require("mongodb");

class UserService {
    constructor(client) {
        this.User = client.db().collection("users");
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractUserData(payload) {
        const user = {
            name: payload.name,
            email: payload.email,
            password: payload.password,
        };
        // Remove undefined fields
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }

    async register(payload) {
        const user = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            user,
            { $set: user },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async findByEmail(email) {
        return await this.User.findOne({email});
    }   

    async login(email) {
        return await this.User.findOneAndLogin(email);
    }
}

module.exports = UserService;