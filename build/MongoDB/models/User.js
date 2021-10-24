"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    numberID: Number,
    username: String,
    img_url: String,
    sub_text: String,
    status: String,
    friends: [String]
});
var UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = UserModel;
