// --- Dotenv
import dotenv from 'dotenv'
dotenv.config()

// --- Dependencies
import {createServer} from 'http'
import path from 'path'
import express, {Response, Request, NextFunction} from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

// --- Modules
import {ServicesModule as Service} from './core/modules/ServicesModule'

// --- Router
import UserRoute from './routes/UserRoute'
import SauceRoute from './routes/SauceRoute'

// --- Variables
const app = express()
const http = createServer(app)
const env = process.env

// --- Middleware
app.use(helmet())
//app.use(cors({origin: true, credentials: true}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use((req:Request, res:Response, next:NextFunction) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
	next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/images', express.static(path.join(__dirname, '../images')))

// --- Router
app.use('/api/sauces', SauceRoute())
app.use('/api/auth', UserRoute())

// --- Start server
http.listen(env.PORT, () => {
	// --- Database
	Service.MongoDB.connect()

	// --- Log
	Service.Logger.Ready(`@Connected API ${env.APP_NAME}\nServer running at http://localhost:${env.PORT}/`)
})