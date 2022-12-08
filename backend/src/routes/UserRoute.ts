// --- Dependencies
import express from 'express'

// --- Controllers
import {UserController} from '../app/controllers/UserController'

// --- Router
export default function UserRoute() {
	// --- Variables
	const app = express.Router()

	// --- Route
	app.post('/signup', UserController.Register)
	app.post('/login', UserController.Connect)

	// --- Return router
	return app
}