// --- Dependencies
import express from 'express'

// --- Modules
import {ServicesModule as Service} from '../core/modules/ServicesModule'
import ImageService from "../core/services/ImageService";

// --- Controllers
import {SauceController} from '../app/controllers/SauceController'

// --- Router
export default function SauceRoute() {
	// --- Variables
	const app = express.Router()

	// --- Route
	app.get('/', Service.Security.Authorizations, SauceController.Find)
	app.get('/:id', Service.Security.Authorizations, SauceController.FindOne)
	app.post('/', Service.Security.Authorizations, ImageService, SauceController.Create)
	app.put('/:id', Service.Security.Authorizations, ImageService, SauceController.Update)
	app.delete('/:id', Service.Security.Authorizations, SauceController.Delete)
	app.post('/:id/like', Service.Security.Authorizations, SauceController.LikeOrDislike)

	// --- Return router
	return app
}