import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'

const MessageType = new GraphQLObjectType({
	name: 'MessageType',
	description: 'A normal discord message',
	fields: () => ({
		uid: { type: GraphQLNonNull(GraphQLString) },
		userUid: { type: GraphQLNonNull(GraphQLString) },
		content: { type: GraphQLNonNull(GraphQLString) },
		username: { type: GraphQLNonNull(GraphQLString) },
		img_url: { type: GraphQLNonNull(GraphQLString) },
		time: { type: GraphQLNonNull(GraphQLString) },
	})
})


export default MessageType