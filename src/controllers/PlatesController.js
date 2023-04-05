const knex = require('../database/knex')
const DiskStorage = require('../providers/DiskStorage')

class PlatesController {
	async create(request, response) {
		const { title, description, price, ingredients } = request.body

		const ingredientList = ingredients.split(',')

		const image = request.file.filename

		const diskStorage = new DiskStorage()

		const filename = await diskStorage.saveFile(image)

		console.log(filename)

		const [plate_id] = await knex('plates').insert({
			title,
			description,
			price: Number(price),
			image: filename,
		})

		const ingredientsInsert = ingredientList.map((ingredient) => {
			return {
				name: ingredient,
				plate_id,
			}
		})

		await knex('ingredients').insert(ingredientsInsert)

		return response.json({ plate_id, ingredients })
	}

	async update(request, response) {
		const { title, description, price, ingredients } = request.body
		const { id } = request.params

		const plate = await knex('plates').where({ id })

		plate.title = title ?? plate.title
		plate.description = description ?? plate.description
		plate.price = price ?? plate.price
		plate.price = price ?? plate.price

		if (ingredients) {
			await knex('ingredients').where({ plate_id: id }).delete()

			const ingredientsInsert = ingredients.map((ingredient) => {
				return {
					name: ingredient,
					plate_id: id,
				}
			})

			await knex('ingredients').insert(ingredientsInsert)
		}

		await knex('plates').where({ id }).update({
			title,
			description,
			price,
		})

		return response.json()
	}

	async show(request, response) {
		const { id } = request.params

		const plate = await knex('plates').where({ id }).first()
		const ingredients = await knex('ingredients')
			.where({ plate_id: id })
			.orderBy('name')

		return response.json({ ...plate, ingredients })
	}

	async index(request, response) {
		const { title } = request.query

		let plates

		if (title) {
			plates = await knex('plates').whereLike('plates.title', `%${title}%`)
		} else {
			plates = await knex('plates')
		}
		return response.json(plates)
	}

	async delete(request, response) {
		const { id } = request.params

		await knex('plates').where({ id }).delete()

		return response.json()
	}
}

module.exports = PlatesController
