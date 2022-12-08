// --- Services
import { LoggerService as Logger } from '../services/LoggerService'
import { DateService as Date } from '../services/DateService'
import {MongoDBService as MongoDB} from '../services/MongoDBService'
import {SecurityService as Security} from '../services/SecurityService'
//import {MediaService as Media} from '../services/ImageService'

// --- Modules
export const ServicesModule = {
	Logger,
	Date,
	MongoDB,
	Security
}
