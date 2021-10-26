import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import { UserInputError } from 'apollo-server-express'
import MessageType from "./ObjectTypes/Message"
import DBQueries from '../MongoDB/userqueries'
import UserType, { FriendType } from "./ObjectTypes/User"

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
		userLogin: {
			type: UserType,
			args: {
				email: { type: GraphQLNonNull(GraphQLString) },
				password: { type: GraphQLNonNull(GraphQLString) },
			},
			resolve: (parent, args) => {
				return DBQueries.userLogin(args.email, args.password)
				.then((user) => {
					console.log(user.email)
					if(user.email === args.email){
						const temp = Object.assign(user, { uid: user._id })
						console.log(temp)
						return temp
					} else {
						throw new UserInputError("User not found", { email: args.email })
					}
				})
				.catch((err) => {

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
		},
		getUserFriends: {
			type: GraphQLList(FriendType),
			args: {
				friendUids: { type: GraphQLList(GraphQLString) }
			},
			resolve: (parent, args) => { 
				return DBQueries.findUserFriends(args.friendUids).then((friends) => {
					const friendFormat = friends.map((friend: any) => {
						const temp = { ...friend._doc, uid: friend._id }
						delete temp._id
						return temp
					})
					return friendFormat;
				})
			}
		}
	})
})

export default RootQueryType