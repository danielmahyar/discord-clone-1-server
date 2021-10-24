/**
 * Importing all needed modules:
 * - GraphQL
 * - MongoDB functions for querying
 */
 import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	subscribe,
	GraphQLInt
} from 'graphql'
import DBQueries from '../MongoDB/userqueries'
import UserType from './ObjectTypes/User'
import { PubSub } from 'graphql-subscriptions'
import MessageType from './ObjectTypes/Message'
import RootMutationType from './MutationType'
import RootSubscriptionType from './SubscriptionType'
import RootQueryType from './QueryType'

export const pubsub = new PubSub()

const schema = new GraphQLSchema({
	query: RootQueryType,
	mutation: RootMutationType,
	subscription: RootSubscriptionType,
})

/**
 * Exporting the schema to 'server.ts'
 */
export default schema
