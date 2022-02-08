const pool = require('../utils/pool.js');

module.exports = class User {
  id;
  email;
  #hashedPassword;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
  }

  static async insert({ email, hashedPassword }) {
    const { rows } = await pool.query(
      'INSERT INTO users (email, hashed_password) VALUES ($1, $2) RETURNING *;',
      [email, hashedPassword]
    );

    return new User(rows[0]);
  }
};
