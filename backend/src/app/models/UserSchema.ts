// --- Dependencies
import mongoose, {Schema} from 'mongoose'

// --- Schema
const UserSchema:Schema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	salt: {
		type: String,
		required: true,
		trim: true
	},
	token: {
		type: String,
		require: true,
		trim: true
	}
}, {timestamps: true})

// --- Model
const UserModel:any = mongoose.model('User', UserSchema)

// --- Export model
export default UserModel