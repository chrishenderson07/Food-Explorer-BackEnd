const createUsers = `
  CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
  	name VARCHAR,
  	email VARCHAR,
  	password VARCHAR,
  	isAdmin INTEGER NOT NULL DEFAULT 0,
  	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`

module.exports = createUsers
