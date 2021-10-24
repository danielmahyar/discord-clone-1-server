import { Schema, model } from 'mongoose' 

export type UserType = {
	_id: String,
	numberID: Number,
	username: String,
	img_url: String,
	sub_text: String,
	status: String,
	friends: Array<string>
}

const UserSchema = new Schema({
	numberID: Number,
	username: String,
	img_url: String,
	sub_text: String,
	status: String,
	friends: [String]
})

const UserModel = model('User', UserSchema)

export default UserModel