const express = require('express'),
Transaction = require('../models/transaction'),
Balance = require('../models/balance'),
error = require('../utils/error'),
logger = require('log');
const { validate } = require('../utils/validator');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await Transaction.getTransactions()
    res.status(200).json(result)
  } catch (err) {
    logger.error('Error on transaction GET method', err)
    next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await Transaction.getTransactionById(id)

    if(result.length > 0){
      res.status(200).json(result)
    }else{
      logger.error(`There are not transactions for this id: ${id}`)
      next(error.httpError('transaction not found', 404))
    }
  } catch (err) {
    logger.error('Error on transaction GET by id method', err)
    next(err)
  }
});

router.post('/', validate, async (req, res, next) => {

  const { body } = req
  try {
    await Balance.updateAmount(body);
    try {
      const result = await Transaction.createTransaction(body)
      res.status(201).json(result);
    } catch (err) {
      logger.error('Error on transaction POST method', err)
      next(err)
    }
  } catch (err) {
    logger.error('Error on transaction POST method', err)
    next(err)
  }
});

module.exports = router;