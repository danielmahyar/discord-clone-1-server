import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import MessageType from "./ObjectTypes/Message"
import UserType from "./ObjectTypes/User"
import DBQueries from '../MongoDB/userqueries'
import { pubsub } from "./Schema"
import ServerType from "./ObjectTypes/Server"

/**
 * The main mutation for graphql
 */
 const RootMutationType = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Root mutation',
	fields: () => ({
		messageAdd: {
			type: MessageType,
			args: {
				userUid: { type: GraphQLNonNull(GraphQLString) },
				content: { type: GraphQLNonNull(GraphQLString) },
				username: { type: GraphQLNonNull(GraphQLString) },
				img_url: { type: GraphQLNonNull(GraphQLString) },
			},
			resolve: (parent, args: any) => {
				return DBQueries.addMessage(args).then((messageAdded) => {
					console.log("Message Added to DB")
					const temp = Object.assign(messageAdded, { uid: messageAdded._id })
					pubsub.publish('messageAdded', {messageAdded: temp})
					return messageAdded
				}).catch((error) => {
					console.log(error)
				})
			}
		},
		addServerMessage: {
			type: MessageType,
			args: {
				userUid: { type: GraphQLNonNull(GraphQLString) },
				content: { type: GraphQLNonNull(GraphQLString) },
				username: { type: GraphQLNonNull(GraphQLString) },
				img_url: { type: GraphQLNonNull(GraphQLString) },
				serverId: { type: GraphQLNonNull(GraphQLString) }
			},
			resolve: (parent, args) => {
				return DBQueries.addMessage(args).then((messageAdded) => {
					console.log("Message Added to DB")
					const temp = Object.assign(messageAdded, { uid: messageAdded._id })
					console.log({ serverMessageAdded: temp })
					pubsub.publish(`serverSub/${args.serverId}`, { serverSubscriptions: temp })
					return messageAdded
				}).catch((error) => {
					console.log(error)
				})
			}
		},
		changeStatus: {
			type: UserType,
			args: {
				userUid: { type: GraphQLNonNull(GraphQLString) },
				status: { type: GraphQLNonNull(GraphQLString) }
			},
			resolve: (parent, args: any) => {
				return DBQueries.changeStatus(args.userUid, args.status).then((userChanged) => {
					const temp = Object.assign(userChanged, { uid: userChanged._id, status: args.status })
					pubsub.publish('friendsStatusChanged/' + args.userUid, { friendsStatusChanged: temp })
					return userChanged
				})
			}
		},
		serverAdd: {
			type: ServerType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				ownerUid: { type: GraphQLNonNull(GraphQLString) },
			},
			resolve: (parent, args) => {
				return DBQueries.serverAdd({name: args.name, ownerUid: args.ownerUid}).then((server) => {
					const temp = Object.assign(server, { id: server._id })
					return temp
				})
			}
		}
	})
})

export default RootMutationType