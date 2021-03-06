import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import DBQueries from '../../MongoDB/userqueries'
import ServerType from './Server'

const UserType = new GraphQLObjectType({
	name: 'UserType',
	description: 'A normal discord user',
	fields: () => ({
		uid: { type: GraphQLNonNull(GraphQLString) },
		email: { type: GraphQLNonNull(GraphQLString) },
		numberId: { type: GraphQLNonNull(GraphQLInt)},
		username: { type: GraphQLNonNull(GraphQLString) },
		img_url: { type: GraphQLNonNull(GraphQLString) },
		sub_text: { type: GraphQLNonNull(GraphQLString) },
		status: { type: GraphQLNonNull(GraphQLString) },
		friends: {
			type: new GraphQLList(FriendType),
			resolve: (user) => {
				return DBQueries.findUserFriends(user.friends).then((friends) => {
					const friendFormat = friends.map((friend: any) => {
						const temp = { ...friend._doc, uid: friend._id }
						delete temp._id
						return temp
					})
					return friendFormat;
				}).catch((error) => {
					return null;
				})
			}
		},
		servers: { type: GraphQLList(GraphQLString) }
	})
})

export const FriendType = new GraphQLObjectType({
	name: "Friend",
	fields: () => ({
		uid: { type: GraphQLNonNull(GraphQLString) },
		numberId: { type: GraphQLNonNull(GraphQLInt) },
		username: { type: GraphQLNonNull(GraphQLString) },
		img_url: { type: GraphQLNonNull(GraphQLString) },
		sub_text: { type: GraphQLNonNull(GraphQLString) },
		status: { type: GraphQLNonNull(GraphQLString) },
	})

})

export default UserType