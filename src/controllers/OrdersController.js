const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class OrdersController {
	async create(request, response) {
		const user_id = request.user.id
		const { plate_id, quantity, total_price } = request.body

		const insertPlates = await knex('orders').insert({
			plate_id,
			quantity,
			total_price,
			user_id,
		})

		return response.status(201).json(insertPlates)
	}

	async show(request, response) {
		const user_id = request.user.id
		const orders = await knex('orders').where({ user_id })

		return response.json(orders)
	}

	async index(request, response) {
		const orders = await knex('orders')

		return response.json(orders)
	}
}

module.exports = OrdersController
