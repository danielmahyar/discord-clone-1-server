"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var Message_1 = __importDefault(require("./ObjectTypes/Message"));
var Schema_1 = require("./Schema");
var RootSubscriptionType = new graphql_1.GraphQLObjectType({
    name: "Subscription",
    description: "Root subscription",
    fields: function () { return ({
        messageAdded: {
            type: Message_1.default,
            args: {
                chatId: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) }
            },
            subscribe: function (parent, args) { return Schema_1.pubsub.asyncIterator('messageAdded'); }
        }
    }); }
});
exports.default = RootSubscriptionType;
