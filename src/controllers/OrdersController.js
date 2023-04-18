const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class OrdersController {
	async create(request, response) {
		const user_id = request.user.id
		const { plate_id } = request.body

		const insertPlates = await knex('orders').insert({
			plate_id,
			user_id,
		})

		return response.status(201).json(insertPlates)
	}

	async index(request, response) {
		const orders = await knex('orders')

		return response.json({ orders })
	}
}

module.exports = OrdersController
