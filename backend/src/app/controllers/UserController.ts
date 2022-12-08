// --- Dependencies
import {Response, Request} from 'express'
import jwt from 'jsonwebtoken'

// --- Model
import UserModel from '../models/UserSchema'

// --- Modules
import {ServicesModule as Service} from '../../core/modules/ServicesModule'

// --- Variables
const env:any = process.env

// --- Class
export class UserController {
	// --- Register
	static async Register(req:Request, res:Response) {
		// --- Variables
		let {email, password} = req.body

		// --- Check data
		if(!email || !password) {
			// --- Send error
			res.status(401).json({ message: 'Les informations de connexion ne sont pas valide ou manquante !' })
		}else {
			// --- Variables
			let salt:string = Service.Security.Salt(10)
			let passwordSecurity:any = await Service.Security.PasswordEncrypt(password, salt)

			// --- Object user
			const user:any = new UserModel({
				email,
				password: passwordSecurity.encrypt,
				salt,
				token: Service.Security.Token()
			})

			// --- Create user
			user.save()
				.then(() => res.status(201).json({message: 'Votre compte a été créé.'}))
				.catch((err:any) => res.status(500).json({message: err}))
		}
	}

	// --- Connect
	static async Connect(req:Request, res:Response) {
		// --- Variables
		let {email, password} = req.body

		// --- Check data
		if(!email || !password) {
			// --- Send error
			res.status(401).json({ message: 'Le compte n\'a pas été trouvé' })
		}else {
			// --- Select user
			let user = await UserModel.findOne({email})
			let passwordSecurity:any = await Service.Security.PasswordDecrypt(user.password, password, user.salt)

			console.log(user)

			// --- Check password
			if(passwordSecurity.type) {
				res.status(200).json({
					userId: user._id,
					token: jwt.sign(
						{userId: user._id},
						env.TOKEN_SECRET,
						{expiresIn: '48h'}
					)
				})
			}else {
				// --- Send error
				res.status(401).json({ message: 'Mot de passe est incorrect !' })
			}
		}
	}
}