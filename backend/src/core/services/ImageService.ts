// --- Dependencies
import multer from 'multer'

// --- Variables
let mimeType:any = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png'
}
let storage:any = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images')
	},
	filename(req: Express.Request, file: Express.Multer.File, cb: (error: (Error | null), filename: string) => void) {
		// --- Variables
		let name:string = file.originalname.split('.')[0].split(' ').join('_')
		let ext:string = mimeType[file.mimetype]

		// --- Callback
		cb(null, `${name}_${Date.now()}.${ext}`)
	}
})

// --- Return
export default multer({storage}).single('image')
