// --- Dependency
import * as CryptoJS from 'crypto-js'
import {v4} from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {Response, Request} from 'express'
import mongoose from 'mongoose'

// --- Schema
import UserModel from "../../app/models/UserSchema";

// --- Variables
const env:any = process.env

// --- Class
export class SecurityService {
	// --- Salt
	static Salt(length: number) {
		let result:any = '';
		let characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let charactersLength:number = characters.length;
		for (let i:any = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() *
				charactersLength));
		}
		return result;
	}

	// --- Token
	static Token() {
		return v4()
	}

	// --- JWT Check
	// @ts-ignore
	static async Authorizations(req:Request, res:Response, next) {

		// --- Variables
		// @ts-ignore
		const token:any = req.headers.authorization.split(' ')[1]
		const decodedToken:any = jwt.verify(token, env.TOKEN_SECRET)
		const id:string = decodedToken.userId


		// --- Check token
		if(id) {
			// --- Select user
			let user = await UserModel.findOne({_id:id})

			// --- Check user
			if(user._id.toString() === id) {
				// --- Next
				next()
			}else {
				res.status(401).json({ message: 'l\'ID n\'est pas valide' })
			}
		}else {
			res.status(401).json({ message: 'Requête non-authentifiée !' })
		}
	}

	// --- Password encrypt
	static async PasswordEncrypt(password:string, salt:string) {
		let passwordSalt = `${process.env.SALT_PASSWORD}${salt}${password}${salt}${process.env.SALT_PASSWORD}`

		// --- Return password and password encrypted
		return {
			password: passwordSalt,
			encrypt: await bcrypt.hash(passwordSalt, 5)
		}
	}

	// --- Password decrypt
	static async PasswordDecrypt(passwordEncrypt:string, password:string, salt:string = '') {
		// --- Check password
		if(!await bcrypt.compare(`${process.env.SALT_PASSWORD}${salt}${password}${salt}${process.env.SALT_PASSWORD}`, passwordEncrypt)) {
			// --- Return null
			return {
				password: null,
				encrypt: null,
				type: false
			}
		}else {
			// --- Return password and password encrypt
			return {
				password: `${process.env.SALT_PASSWORD}${salt}${password}${salt}${process.env.SALT_PASSWORD}`,
				encrypt: passwordEncrypt,
				type: true
			}
		}
	}
}