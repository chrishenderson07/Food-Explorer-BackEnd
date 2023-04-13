exports.up = (knex) =>
	knex.schema.createTable('cart', (table) => {
		table.increments('id')
		table
			.integer('plate_id')
			.references('id')
			.inTable('plates')
			.onDelete('CASCADE')
		table.text('plate_title')
		table.text('plate_img')
		table.integer('plate_price')
		table.integer('quantity')
		table.text('user_id').references('id').inTable('users')

		table.timestamp('created_at').defaultTo(knex.fn.now())
	})

exports.down = (knex) => knex.schema.dropTable('cart')
