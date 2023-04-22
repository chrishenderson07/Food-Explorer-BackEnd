const { hash, compare } = require('bcryptjs')

const AppError = require('../utils/AppError')

const sqliteConnection = require('../database/sqlite')

class UsersController {
	async create(request, response) {
		const { name, email, password, isAdmin } = request.body

		const database = await sqliteConnection()
		const checkUserExists = await database.get(
			'SELECT * FROM users WHERE email = (?)',
			[email],
		)

		if (checkUserExists) {
			throw new AppError('Este email ja está em uso')
		}

		if (password.length < 8) {
			throw new AppError('Sua senha precisa ter pelo menos 8 caracteres')
		}

		const hashedPassword = await hash(password, 8)

		await database.run(
			'INSERT INTO users (name, email, password, isAdmin) VALUES (?,?,?,?)',
			[name, email, hashedPassword, isAdmin ? 1 : 0],
		)

		return response.status(201).json()
	}
}

module.exports = UsersController
