const { Router } = require('express')

const CartController = require('../controllers/CartController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const cartRoutes = Router()

const cartController = new CartController()

cartRoutes.use(ensureAuthenticated)

cartRoutes.post('/', cartController.create)
cartRoutes.get('/', cartController.show)
cartRoutes.delete('/:id', cartController.delete)

module.exports = cartRoutes
