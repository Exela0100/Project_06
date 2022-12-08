// --- Dependencies
import {Response, Request} from 'express'
import * as fs from 'fs'

// --- Model
import SauceModel from '../models/SauceSchema'

// --- Variables
const env:any = process.env

// --- Class
export class SauceController {
	// --- Find all sauces
	static async Find(req:Request, res:Response) {
		SauceModel.find()
			.then((data:any) => res.status(200).json(data))
			.catch((err:any) => res.status(400).json({message: err}))
	}

	// --- Find one sauce
	static async FindOne(req:Request, res:Response) {
		SauceModel.findOne({_id: req.params.id})
			.then((data:any) => res.status(200).json(data))
			.catch((err:any) => res.status(400).json({message: err}))
	}

	// --- Create sauce
	static async Create(req:Request, res:Response) {
		// --- Variables
		let data = JSON.parse(req.body.sauce)

		if(Object.keys(data).length <= 0) {
			res.status(401).json({ message: 'Une erreur est survenue lors de la réception des données' })
		}else {
			// --- Variables
			let sauceObject = new SauceModel({
				...data,
				imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file?.filename}`
			})

			// --- Create sauce
			sauceObject.save()
				.then(() => res.status(201).json(  {message: 'La sauce a été créer.'}))
				.catch((err:any) => res.status(400).json( {message: err}))
		}
	}

	// --- Update sauce
	static async Update(req:Request, res:Response) {
		// --- Variables
		let data = req.file ? {
			...JSON.parse(req.body.sauce),
			imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file?.filename}`

		} : req.body

		// --- Check data
		if(Object.keys(data).length <= 0) {
			res.status(401).json({ message: 'Une erreur est survenue lors de la réception des données' })
		}else {
			// --- Update sauce
			SauceModel.updateOne({_id:req.params.id}, {...data, _id:req.params.id})
				.then(() => res.status(201).json(  {message: 'La sauce a été modifié.'}))
				.catch((err:any) => res.status(400).json( {message: err}))
		}
	}

	// --- Delete sauce
	static async Delete(req:Request, res:Response) {
		SauceModel.findOne({_id:req.params.id})
			.then((dataSauce:any) => {
				let imageURI = dataSauce.imageUrl.split('/images/')[1]
				fs.unlink(`image/${imageURI}`, () => {
					SauceModel.deleteOne({_id:req.params.id})
						.then(() => res.status(200).json(  {message: 'La sauce a été supprimé.'}))
						.catch((err:any) => res.status(400).json({message: err}))
				})
			})
			.catch((err:any) => res.status(500).json({message: err}))
	}

	// --- Like or Dislike
	static async LikeOrDislike(req:Request, res:Response) {
		if(req.body.like === 1) {
			// --- Update like
			SauceModel.updateOne({_id:req.params.id}, {$inc: {likes: req.body.like++}, $push: {usersLiked: req.body.userId}})
				.then(() => res.status(201).json(  {message: 'Votre like a été ajouter.'}))
				.catch((err:any) => res.status(400).json( {message: err}))
		}else if(req.body.like === -1) {
			// --- Update dislike
			SauceModel.updateOne({_id:req.params.id}, {$inc: {dislikes: (req.body.like++) * -1}, $push: {usersDisliked: req.body.userId}})
				.then(() => res.status(201).json(  {message: 'Votre dislike a été ajouter.'}))
				.catch((err:any) => res.status(400).json( {message: err}))
		}else {
			// --- Reset like or dislike
			SauceModel.findOne({_id: req.params.id})
				.then((data:any) => {
					if (data.usersLiked.includes(req.body.userId)) {
						// --- Reset like
						SauceModel.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
							.then(() => { res.status(200).json({ message: 'Votre like a été supprimé !' }) })
							.catch((err:any) => res.status(400).json({ message:err }))
					}else if(data.usersDisliked.includes(req.body.userId)){
						// --- Reset dislike
						SauceModel.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
							.then(() => { res.status(200).json({ message: 'Votre dislike a été supprimé !' }) })
							.catch((err:any) => res.status(400).json({ message:err }))
					}
				})
				.catch((err:any) => res.status(400).json({message: err}))
		}
	}
}