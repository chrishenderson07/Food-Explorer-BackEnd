exports.up = (knex) =>
	knex.schema.createTable('orders', (table) => {
		table.increments('id')
		table.integer('cart_id').references('id').inTable('cart')
		table.integer('plate_id').references('id').inTable('plates')

		table
			.enu('status', ['Pendente', 'Preparando', 'Entregue'])
			.defaultTo('Pendente', (options = {}))

		table.timestamp('created_at').default(knex.fn.now())
		table.timestamp('update_at').default(knex.fn.now())
	})

exports.down = (knex) => knex.schema.dropTable('orders')
