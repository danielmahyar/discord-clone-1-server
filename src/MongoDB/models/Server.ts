import { Schema, model } from 'mongoose' 

export type ServerType = {
	_id: String,
	name: String,
	img_url: String,
	channels: Array<String>,
	users: Array<String>,
}

const ServerSchema = new Schema({
	id: String,
	name: String,
	img_url: String,
	channels: [String],
	users: [String],
})

const ServerModel = model('Server', ServerSchema)

export default ServerModel