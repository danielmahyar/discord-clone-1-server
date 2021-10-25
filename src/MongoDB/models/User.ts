import { Schema, model } from 'mongoose' 

export type UserType = {
	_id: String,
	email: String,
	numberId: Number,
	username: String,
	img_url: String,
	sub_text: String,
	status: String,
	friends: Array<string>
}

const UserSchema = new Schema({
	numberId: Number,
	username: String,
	email: String,
	img_url: String,
	sub_text: String,
	status: String,
	friends: [String]
})

const UserModel = model('User', UserSchema)

export default UserModel