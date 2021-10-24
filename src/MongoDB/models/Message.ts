import { Schema, model } from 'mongoose' 

export type MessageType = {
	_id: String,
	userUid: String,
	content: String,
	username: String,
	img_url: String,
	sub_text: String,
}

const MessageSchema = new Schema({
	userUid: String,
	content: String,
	username: String,
	img_url: String,
	sub_text: String,
})

const MessageModel = model('Message', MessageSchema)

export default MessageModel