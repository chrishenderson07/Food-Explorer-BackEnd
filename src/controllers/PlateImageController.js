const knex = require('knex')
const DiskStorage = require('../providers/DiskStorage')
const AppError = require('../utils/AppError')

class PlateImageController {
	async update(request, response) {
		const plate_id = request.params
		const plateFileName = request.file.filename

		const diskStorage = new DiskStorage()

		const plate = await knex('plates').where({ id: plate_id }).first()

		if (!plate) {
			throw new AppError('Prato não Encontrado', 401)
		}

		if (plate.image) {
			await diskStorage.deleteFile(plate.image)
		}

		const fileName = await diskStorage.saveFile(plateFileName)
		plate.image = fileName

		await knex('plates').insert(plate).where({ id: plate_id })
		return response.json(plate)
	}
}

module.exports = PlateImageController
