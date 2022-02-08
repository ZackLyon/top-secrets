const { Router } = require('express');
const UserService = require('../services/UserService.js');

const TWO_HRS = 1000 * 60 * 60 * 2;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);

      res.json(user);
    } catch (error) {
      next(error);
    }
  })

  .post('/sessions', async (req, res, next) => {
    try {
      const token = await UserService.logIn(req.body);

      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          maxAge: TWO_HRS,
        })
        .json({ message: `Signed in as ${req.body.email}.` });
    } catch (error) {
      next(error);
    }
  })

  .delete('/sessions', async (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ message: 'You have been signed out.' });
  });
