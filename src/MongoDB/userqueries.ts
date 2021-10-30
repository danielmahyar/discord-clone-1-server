import mongoose from 'mongoose'
import MessageModel, { MessageType } from './models/Message'
import ServerModel, { ServerType } from './models/Server'
import UserModel, { UserType } from './models/User'

const MongoQueries = {

	findUserFriends: async (friends: Array<string>): Promise<any> => {
		const formattedFriendUids = friends.map((friend) => (new mongoose.Types.ObjectId(friend)))

		return UserModel.find({
			'_id': { $in: formattedFriendUids}
		})
	},

	userLogin: async (email: string, password: string = ""): Promise<UserType> => {
		return UserModel.findOne({ email })
	},

	getUser: async (uid: string): Promise<UserType> => {
		const user: UserType = await UserModel.findById(uid)
		return user
	},

	getUsers: async (uids: Array<string>): Promise<any> => {
		const formattedUserUids = uids.map((uid) => (new mongoose.Types.ObjectId(uid)))

		return UserModel.find({
			'_id': { $in: formattedUserUids }
		})
	},

	changeStatus: async (uid: string, status: string): Promise<UserType> => UserModel.findByIdAndUpdate(uid, { status }),

	getMessages: async (chatId: string): Promise<Array<MessageType>> => {
		console.log("%cServer Speaking: I am getting messages", "color: green;")
		return MessageModel.find()
	},

	addMessage: async (message: any): Promise<MessageType> => {
		const newMessage = new MessageModel(message)
		return newMessage.save()
	},

	serverFind: async (serverId: string): Promise<any> => {
		console.log(serverId)
		return ServerModel.findById(serverId)
	},

	serverAdd: async ({ name, img_url = "", ownerUid }: any): Promise<ServerType> => {
		const newServer = new ServerModel({
			name,
			img_url,
			users: [ownerUid],
			channels: []
		})
		return newServer.save()
	} 

}

export default MongoQueries