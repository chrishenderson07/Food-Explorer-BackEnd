exports.up = (knex) =>
	knex.schema.createTable('ingredients', (table) => {
		table.increments('id')
		table.text('name')
		table
			.integer('plate_id')
			.references('id')
			.inTable('plates')
			.onDelete('CASCADE')
		table.text('image').defaultTo(null)
	})

exports.down = (knex) => knex.schema.dropTable('ingredients')
