const express = require('express'),
Balance = require('../models/balance'),
logger = require('log');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await Balance.getBalance()
    res.status(200).json(result)
  } catch (err) {
    logger.error('Error on balance GET method', err)
    next(err)
  }
});

module.exports = router;