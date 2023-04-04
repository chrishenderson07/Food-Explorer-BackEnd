const { Router } = require('express')

const PlatesController = require('../controllers/PlatesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const multer = require('multer')
const uploadConfig = require('../configs/upload')
const upload = multer(uploadConfig.MULTER)

const platesRoutes = Router()

const platesController = new PlatesController()

platesRoutes.use(ensureAuthenticated)

platesRoutes.get('/', platesController.index)
platesRoutes.post('/', upload.single('image'), platesController.create)
platesRoutes.put('/:id', upload.single('image'), platesController.update)
platesRoutes.get('/:id', platesController.show)
platesRoutes.delete('/:id', platesController.delete)

module.exports = platesRoutes
