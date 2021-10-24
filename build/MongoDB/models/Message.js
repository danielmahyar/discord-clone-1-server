"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var MessageSchema = new mongoose_1.Schema({
    userUid: String,
    content: String,
    username: String,
    img_url: String,
    sub_text: String,
});
var MessageModel = (0, mongoose_1.model)('Message', MessageSchema);
exports.default = MessageModel;
