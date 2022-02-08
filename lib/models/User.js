const pool = require('../utils/pool.js');

module.exports = class User {
  id;
  email;
  #hashedPassword;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.#hashedPassword = row.hashed_password;
  }

  static async insert({ email, hashedPassword }) {
    const { rows } = await pool.query(
      'INSERT INTO users (email, hashed_password) VALUES ($1, $2) RETURNING *;',
      [email, hashedPassword]
    );

    return new User(rows[0]);
  }

  static async getByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [
      email,
    ]);

    return rows[0] ? new User(rows[0]) : null;
  }

  get hashedPassword() {
    return this.#hashedPassword;
  }
};
