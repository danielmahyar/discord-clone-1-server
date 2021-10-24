import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import MessageType from "./ObjectTypes/Message";
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
			subscribe: (parent, args) => pubsub.asyncIterator('messageAdded')
		}
	})
})

export default RootSubscriptionType