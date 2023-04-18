exports.up = (knex) =>
	knex.schema.createTable('orders', (table) => {
		table.increments('id')
		table.string('plate_id')
		table.integer('user_id').references('id').inTable('users')
		table.integer('total_price')

		table
			.enu('status', ['Pendente', 'Preparando', 'Entregue'])
			.defaultTo('Pendente', (options = {}))

		table.timestamp('created_at').default(knex.fn.now())
		table.timestamp('update_at').default(knex.fn.now())
	})

exports.down = (knex) => knex.schema.dropTable('orders')
