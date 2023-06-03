exports.up = (knex) =>
	knex.schema.createTable('orders', (table) => {
		table.increments('id')
		table.text('plate_id')
		table.text('quantity')
		table.text('total_price')
		table.integer('user_id').references('id').inTable('users')

		table
			.enu('status', ['Pendente', 'Preparando', 'Entregue'])
			.defaultTo('Preparando', (options = {}))

		table.timestamp('created_at').default(knex.fn.now())
		table.timestamp('update_at').default(knex.fn.now())
	})

exports.down = (knex) => knex.schema.dropTable('orders')
