import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import MessageType from "./ObjectTypes/Message"
import UserType from "./ObjectTypes/User"
import DBQueries from '../MongoDB/userqueries'
import { pubsub } from "./Schema"

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
		}
	})
})

export default RootMutationType