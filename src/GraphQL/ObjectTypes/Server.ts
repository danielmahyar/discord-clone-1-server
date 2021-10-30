import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import DBQueries from '../../MongoDB/userqueries'
import UserType from './User'

const ServerType = new GraphQLObjectType({
	name: 'ServerType',
	description: 'A normal discord server',
	fields: () => ({
		id: { type: GraphQLNonNull(GraphQLString) },
		name: { type: GraphQLNonNull(GraphQLString) },
		channels: { type: GraphQLList(GraphQLString) },
		img_url: { type: GraphQLNonNull(GraphQLString) },
		users: {
			type: GraphQLList(UserType),
			resolve: (server) => {
				return DBQueries.getUsers(server.users).then((users) => {
					const usersFormat = users.map((user: any) => {
						const temp = { ...user._doc, uid: user._id }
						delete temp._id
						return temp
					})
					return usersFormat;
				})
			}
		}
	})
})


export default ServerType