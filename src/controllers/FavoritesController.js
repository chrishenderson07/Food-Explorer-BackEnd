const knex = require('../database/knex')

class FavoritesController {
	async create(request, response) {
		const user_id = request.user.id
		const { favoriteItems } = request.body

		const favorite = await knex('favorites')
			.insert({
				user_id,
				plate_id: favoriteItems,
			})
			.where(user_id)

		return response.json()
	}

	async index(request, response) {
		const user_id = request.user.id

		const favorites = await knex('favorites').where({ user_id })

		return response.json(favorites)
	}

	async delete(request, response) {
		const user_id = request.user.id
		const { favoriteItems } = request.body

		const favorite = await knex('favorites')
			.where({ plate_id: favoriteItems })
			.delete()

		return response.json()
	}
}

module.exports = FavoritesController
