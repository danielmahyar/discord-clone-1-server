"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var MessageType = new graphql_1.GraphQLObjectType({
    name: 'MessageType',
    description: 'A normal discord message',
    fields: function () { return ({
        uid: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        userUid: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        content: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        username: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        img_url: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
    }); }
});
exports.default = MessageType;
