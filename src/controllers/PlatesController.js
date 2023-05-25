const knex = require('../database/knex')
const DiskStorage = require('../providers/DiskStorage')

class PlatesController {
	async create(request, response) {
		// const { title, description, price, categories, ingredients } = request.body

		const { title, description, price, categories, ingredients } = request.body
		const imageFile = request.file.filename
		const ingredientList = ingredients.split(',')

		const diskStorage = new DiskStorage()

		const filename = await diskStorage.saveFile(imageFile)

		const [plate_id] = await knex('plates').insert({
			title,
			description,
			price,
			categories,
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
		// return response.json({ plate_id })
	}

	async update(request, response) {
		const { title, description, price, categories, ingredients } = request.body
		const { id } = request.params

		// const imageFile = request.file.filename
		// const diskStorage = new DiskStorage()

		// const filename = await diskStorage.saveFile(imageFile)

		const plate = await knex('plates').where({ id })

		plate.title = title ?? plate.title
		plate.description = description ?? plate.description
		plate.price = price ?? plate.price
		plate.categories = categories ?? plate.categories
		// plate.image = filename ?? plate.image

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
			categories,
		})

		return response.json()
	}

	async show(request, response) {
		const { id } = request.params

		const plate = await knex('plates').where({ id }).first()
		const { image } = plate
		const ingredients = await knex('ingredients')
			.where({ plate_id: id })
			.orderBy('name')

		return response.json({ ...plate, image, ingredients })
	}

	async index(request, response) {
		const { title, ingredients } = request.query

		let plates

		if (ingredients) {
			const filteredIngredients = ingredients
				.split(',')
				.map((ingredient) => ingredient.trim())

			plates = await knex('ingredients')
				.select(['plates.id', 'plates.title'])
				.whereLike('plates.title', `%${title}%`)
				.whereIn('name', filteredIngredients)
				.innerJoin('plates', 'plates.id', 'ingredients.plate_id')
				.groupBy('plates.id')
				.orderBy('plates.title')
		} else {
			plates = await knex('plates')
				.whereLike('title', `%${title}%`)
				.orderBy('title')
		}

		const platesIngredients = await knex('ingredients')
		const platesWithIngredients = plates.map((plate) => {
			const plateIngredient = platesIngredients.filter(
				(ingredients) => ingredients.plate_id === plate.id,
			)

			return {
				...plate,
				ingredients: plateIngredient,
			}
		})

		return response.json(platesWithIngredients)
	}

	async delete(request, response) {
		const { id } = request.params

		await knex('plates').where({ id }).delete()

		return response.json()
	}
}

module.exports = PlatesController
