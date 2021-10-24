import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import { UserInputError } from 'apollo-server-express'
import MessageType from "./ObjectTypes/Message"
import DBQueries from '../MongoDB/userqueries'
import UserType from "./ObjectTypes/User"

const RootQueryType = new GraphQLObjectType({
	name: 'Query',
	description: 'Root Query',
	fields: () => ({
		getMessages: {
			type: GraphQLList(MessageType),
			args: {
				chatId: { type: GraphQLNonNull(GraphQLString) }
			},
			resolve: (parent, args) => {
				return DBQueries.getMessages("awdawd").then((messages) => {

					const messagesFormat = messages.map((message: any) => {
						const temp = { ...message._doc, uid: message._id }
						delete temp._id
						return temp
					})

					return messagesFormat;

				})
			}
		},
		getUser: {
			type: UserType,
			description: "Specific user",
			args: {
				uid: { type: GraphQLNonNull(GraphQLString) }
			},
			resolve: (parent, args) => {
				return DBQueries.getUser(args.uid).then((user) => {
					return Object.assign(user, { uid: args.uid });
				}).catch((err) => {
					throw new UserInputError("User not found", { uid: args.uid })
				})
			}
		}
	})
})

export default RootQueryType