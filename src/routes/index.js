const { Router } = require('express')

const usersRoutes = require('./users.routes')
const platesRoutes = require('./plates.routes')
const favoritesRoutes = require('./favorites.routes')
const cartRoutes = require('./cart.routes')
const ordersRoutes = require('./orders.routes')
const sessionsRoutes = require('./sessions.routes')

const routes = Router()

// Nessa parte eu digo que ao tentar o caminho /users, ele vará a rota usersRoutes
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/plates', platesRoutes)
routes.use('/favorites', favoritesRoutes)
routes.use('/cart', cartRoutes)
routes.use('/orders', ordersRoutes)

module.exports = routes
