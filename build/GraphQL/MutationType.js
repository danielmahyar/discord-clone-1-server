"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var Message_1 = __importDefault(require("./ObjectTypes/Message"));
var userqueries_1 = __importDefault(require("../MongoDB/userqueries"));
var Schema_1 = require("./Schema");
/**
 * The main mutation for graphql
 */
var RootMutationType = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    description: 'Root mutation',
    fields: function () { return ({
        messageAdd: {
            type: Message_1.default,
            args: {
                userUid: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                content: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                username: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                img_url: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
            },
            resolve: function (parent, args) {
                return userqueries_1.default.addMessage(args).then(function (messageAdded) {
                    console.log("Message Added to DB");
                    var temp = Object.assign(messageAdded, { uid: messageAdded._id });
                    Schema_1.pubsub.publish('messageAdded', { messageAdded: temp });
                    return messageAdded;
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
    }); }
});
exports.default = RootMutationType;
