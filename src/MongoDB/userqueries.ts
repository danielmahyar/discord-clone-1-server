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

	getUser: async (uid: string): Promise<UserType> => {
		const user: UserType = await UserModel.findById(uid)
		return user
	},

	getMessages: async (chatId: string): Promise<Array<MessageType>> => {
		return MessageModel.find()
	},

	addMessage: async (message: any): Promise<MessageType> => {
		const newMessage = new MessageModel(message)
		return newMessage.save()
	}

}

export default MongoQueries