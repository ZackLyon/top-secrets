const { Router } = require('express');
const Secret = require('../models/Secret.js');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const secret = await Secret.insert(req.body);

    res.json(secret);
  } catch (error) {
    next(error);
  }
});
