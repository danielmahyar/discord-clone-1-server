import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import DBQueries from '../../MongoDB/userqueries'

const UserType = new GraphQLObjectType({
	name: 'UserType',
	description: 'A normal discord user',
	fields: () => ({
		uid: { type: GraphQLNonNull(GraphQLString) },
		numberID: { type: GraphQLNonNull(GraphQLInt)},
		username: { type: GraphQLNonNull(GraphQLString) },
		img_url: { type: GraphQLNonNull(GraphQLString) },
		sub_text: { type: GraphQLNonNull(GraphQLString) },
		status: { type: GraphQLNonNull(GraphQLString) },
		friends: {
			type: new GraphQLList(FriendType),
			resolve: (user) => {
				return DBQueries.findUserFriends(user.friends).then((friend) => {
					const friendFormat = friend.map((friend: any) => {
						const temp = { ...friend._doc, uid: friend._id }
						delete temp._id
						console.log(temp)
						return temp
					})
					return friendFormat;
				}).catch((error) => {
					return null;
				})
			}
		}
	})
})

const FriendType = new GraphQLObjectType({
	name: "Friend",
	fields: () => ({
		uid: { type: GraphQLNonNull(GraphQLString) },
		numberID: { type: GraphQLNonNull(GraphQLInt) },
		username: { type: GraphQLNonNull(GraphQLString) },
		img_url: { type: GraphQLNonNull(GraphQLString) },
		sub_text: { type: GraphQLNonNull(GraphQLString) },
		status: { type: GraphQLNonNull(GraphQLString) },
	})

})

export default UserType