const { request } = require("../app");

const mongoose = require("mongoose");

const schema = mongoose.Schema;

const UserSchema = new schema({
    name : String,
    email: String,
    country: String
});

const User = mongoose.model('User',UserSchema);
module.exports = User;

