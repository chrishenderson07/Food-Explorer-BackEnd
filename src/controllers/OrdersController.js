const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class OrdersController {
	async create(request, response) {
		const user_id = request.user.id

		const insertPlates = await knex.from(
			knex.raw('??(??,??,??,??)', [
				'orders',
				'plate_id',
				'plate_title',
				'plate_price',
			]),
		)
	}
}

module.exports = OrdersController
