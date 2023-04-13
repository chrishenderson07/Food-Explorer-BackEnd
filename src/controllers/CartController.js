const knex = require('../database/knex')

class CartController {
	async create(request, response) {
		const user_id = request.user.id
		const { quantity, plate_id } = request.body

		const data = await knex
			.from(
				knex.raw('?? (??, ??, ??, ??, ??, ??)', [
					'cart',
					'plate_id',
					'plate_title',
					'plate_img',
					'plate_price',
					'quantity',
					'user_id',
				]),
			)
			.insert(function () {
				this.from('plates')
					.where({ id: plate_id })
					.select('id', 'title', 'image', 'price', quantity, user_id)
			})

		return response.status(201).json(data)
	}

	async show(request, response) {
		const user_id = request.user.id

		const showCart = await knex('cart').where({ user_id })

		return response.json([...showCart])
	}

	async delete(request, response) {
		const id = request.params
		await knex('cart').where({ id })

		return response.status(200).json()
	}
}

module.exports = CartController
