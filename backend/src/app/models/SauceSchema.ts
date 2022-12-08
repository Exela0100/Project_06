// --- Dependencies
import mongoose, {Schema} from 'mongoose'

// --- Schema
const SauceSchema:Schema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
		trim: true
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	manufacturer: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		require: true,
		trim: true
	},
	mainPepper: {
		type: String,
		require: true,
		trim: true
	},
	imageUrl: {
		type: String,
		require: true,
		trim: true
	},
	heat: {
		type: Number,
		require: true
	},
	likes:{
		type: Number,
		default: 0,
	},
	dislikes:{
		type: Number,
		default: 0,
	},
	usersLiked:{
		type: [String]
	},
	usersDisliked:{
		type: [String]
	}
}, {timestamps: true})

// --- Model
const SauceModel:any = mongoose.model('Sauce', SauceSchema)

// --- Export model
export default SauceModel