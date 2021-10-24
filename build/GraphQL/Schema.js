"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubsub = void 0;
/**
 * Importing all needed modules:
 * - GraphQL
 * - MongoDB functions for querying
 */
var graphql_1 = require("graphql");
var graphql_subscriptions_1 = require("graphql-subscriptions");
var MutationType_1 = __importDefault(require("./MutationType"));
var SubscriptionType_1 = __importDefault(require("./SubscriptionType"));
var QueryType_1 = __importDefault(require("./QueryType"));
exports.pubsub = new graphql_subscriptions_1.PubSub();
var schema = new graphql_1.GraphQLSchema({
    query: QueryType_1.default,
    mutation: MutationType_1.default,
    subscription: SubscriptionType_1.default,
});
/**
 * Exporting the schema to 'server.ts'
 */
exports.default = schema;
