const { Router } = require('express')

const PlatesController = require('../controllers/PlatesController')
const PlatesImageController = require('../controllers/PlatesImageController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const multer = require('multer')
const uploadConfig = require('../configs/upload')
const upload = multer(uploadConfig.MULTER)

const platesRoutes = Router()

const platesController = new PlatesController()
const platesImageController = new PlatesImageController()

platesRoutes.use(ensureAuthenticated)

platesRoutes.get('/', platesController.index)

platesRoutes.post('/', upload.single('image'), platesController.create)
platesRoutes.put('/:id', upload.single('image'), platesController.update)
platesRoutes.get('/:id', platesController.show)
platesRoutes.delete('/:id', platesController.delete)
platesRoutes.patch(
	'/plateimage/:id',
	upload.single('image'),
	platesImageController.update,
)

module.exports = platesRoutes
