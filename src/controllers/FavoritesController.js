const knex = require('../database/knex')
const AppError = require('../utils/AppError')
class FavoritesController {
	async create(request, response) {
		const user_id = request.user.id
		const { plate_id } = request.body

		const favorite = await knex('favorites')
			.insert({
				user_id,
				plate_id,
			})
			.where({ user_id })

		return response.json()
	}

	async index(request, response) {
		const user_id = request.user.id

		const favorites = await knex('favorites')
			.where({ user_id })
			.groupBy('plate_id')

		return response.json(favorites)
	}

	async delete(request, response) {
		const user_id = request.user.id
		const { plate_id } = request.body

		const favorite = await knex('favorites').where({ plate_id }).delete()

		return response.json()
	}
}

module.exports = FavoritesController
