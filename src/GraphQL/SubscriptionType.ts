import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import MessageType from "./ObjectTypes/Message";
import { FriendType } from "./ObjectTypes/User";
import { pubsub } from "./Schema";

const RootSubscriptionType = new GraphQLObjectType({
	name: "Subscription",
	description: "Root subscription",
	fields: () => ({
		messageAdded: {
			type: MessageType,
			args: {
				chatId: { type: GraphQLNonNull(GraphQLString) }
			},
			subscribe: (parent, args) => {
				console.log("I get messages now")
				return pubsub.asyncIterator('messageAdded')
			}
		},

		friendsStatusChanged: {
			type: FriendType,
			args: {
				friendUids: { type: GraphQLList(GraphQLString) }
			},
			subscribe: (parent, args) => {
				const formatUidArray = args.friendUids.map((friendUid: string) => {
					return 'friendsStatusChanged/' + friendUid
				})
				return pubsub.asyncIterator(formatUidArray)
			}	
		}
	})
})

export default RootSubscriptionType