exports.up = (knex) =>
	knex.schema.createTable('plates', (table) => {
		table.increments('id')
		table.text('title')
		table.text('description')
		table.text('price')
		table
			.enu('categories', ['Pratos Principais', 'Sobremesas', 'Bebidas'])
			.defaultTo('Pratos Principais')
		table.text('image')

		table.timestamp('created_at').defaultTo(knex.fn.now())
		table.timestamp('updated_at').defaultTo(knex.fn.now())
	})

exports.down = (knex) => knex.schema.dropTable('plates')
