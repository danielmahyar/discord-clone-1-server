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
var userqueries_1 = __importDefault(require("../../MongoDB/userqueries"));
var UserType = new graphql_1.GraphQLObjectType({
    name: 'UserType',
    description: 'A normal discord user',
    fields: function () { return ({
        uid: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        numberID: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        username: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        img_url: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        sub_text: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        status: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        friends: {
            type: new graphql_1.GraphQLList(FriendType),
            resolve: function (user) {
                return userqueries_1.default.findUserFriends(user.friends).then(function (friend) {
                    var friendFormat = friend.map(function (friend) {
                        var temp = __assign(__assign({}, friend._doc), { uid: friend._id });
                        delete temp._id;
                        console.log(temp);
                        return temp;
                    });
                    return friendFormat;
                }).catch(function (error) {
                    return null;
                });
            }
        }
    }); }
});
var FriendType = new graphql_1.GraphQLObjectType({
    name: "Friend",
    fields: function () { return ({
        uid: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        numberID: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        username: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        img_url: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        sub_text: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        status: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
    }); }
});
exports.default = UserType;
