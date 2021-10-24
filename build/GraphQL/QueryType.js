"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var apollo_server_express_1 = require("apollo-server-express");
var Message_1 = __importDefault(require("./ObjectTypes/Message"));
var userqueries_1 = __importDefault(require("../MongoDB/userqueries"));
var User_1 = __importDefault(require("./ObjectTypes/User"));
var RootQueryType = new graphql_1.GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: function () { return ({
        getMessages: {
            type: (0, graphql_1.GraphQLList)(Message_1.default),
            args: {
                chatId: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) }
            },
            resolve: function (parent, args) {
                return userqueries_1.default.getMessages("awdawd").then(function (messages) {
                    var messagesFormat = messages.map(function (message) {
                        var temp = __assign(__assign({}, message._doc), { uid: message._id });
                        delete temp._id;
                        return temp;
                    });
                    return messagesFormat;
                });
            }
        },
        getUser: {
            type: User_1.default,
            description: "Specific user",
            args: {
                uid: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) }
            },
            resolve: function (parent, args) {
                return userqueries_1.default.getUser(args.uid).then(function (user) {
                    return Object.assign(user, { uid: args.uid });
                }).catch(function (err) {
                    throw new apollo_server_express_1.UserInputError("User not found", { uid: args.uid });
                });
            }
        }
    }); }
});
exports.default = RootQueryType;
