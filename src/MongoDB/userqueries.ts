import mongoose from 'mongoose'
import MessageModel, { MessageType } from './models/Message'
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

	changeStatus: async (uid: string, status: string): Promise<UserType> => UserModel.findByIdAndUpdate(uid, { status }),

	getMessages: async (chatId: string): Promise<Array<MessageType>> => {
		console.log("%cServer Speaking: I am getting messages", "color: green;")
		return MessageModel.find()
	},

	addMessage: async (message: any): Promise<MessageType> => {
		const newMessage = new MessageModel(message)
		return newMessage.save()
	}

}

export default MongoQueries