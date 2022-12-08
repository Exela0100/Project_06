// --- Dependencies
import mongoose from 'mongoose'

// --- Variables
const {DB_CONNECT, API_NAME}:any = process.env

// --- Modules
import {LoggerService} from './LoggerService'

// --- Class
export class MongoDBService {
	static connect() {
		// --- Connect database
		return mongoose.connect(DB_CONNECT, (err:any) => {
			if(err) {
				// --- Error
				LoggerService.Error(err)
			}else {
				// --- Message
				LoggerService.Ready(`@Connected Database ${API_NAME}`)
			}
		})
	}
}