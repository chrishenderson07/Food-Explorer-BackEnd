exports.up = (knex) =>
	knex.schema.createTable('orders', (table) => {
		table.increments('id')
		table.text('status')
		table.text('description')
		table.float('price')

		table.timestamp('created_at').defaultTo(knex.fn.now())
		table.timestamp('updated_at').defaultTo(knex.fn.now())

		table
			.integer('user_id')
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
	})

exports.down = (knex) => knex.schema.dropTable('orders')
