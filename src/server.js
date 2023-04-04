require('express-async-errors')

const migrationsRun = require('./database/sqlite/migrations')

const AppError = require('./utils/AppError')
const uploadConfig = require('./configs/upload')

const path = require('path')

const express = require('express')

migrationsRun()

const routes = require('./routes')

const app = express()
app.use(express.json())

app.use('/plates', express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

app.use((error, request, response, next) => {
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({
			status: 'error',
			message: error.message,
		})
	}

	return response.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
	})
})

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
