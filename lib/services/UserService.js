const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

module.exports = class UserService {
  static async create({ email, password }) {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({ email, hashedPassword });

    return user;
  }

  static async logIn({ email, password }) {
    try {
      const user = await User.getByEmail(email);

      const match = user
        ? await bcrypt.compare(password, user.hashedPassword)
        : false;

      if (!user || !match) throw new Error('Invalid credentials.');

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '2h',
      });

      return token;
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }
};
