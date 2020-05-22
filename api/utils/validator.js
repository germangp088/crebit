const logger = require('log'),
validator = require('validator');

const validate = (req, res, next) => {
	logger.debug('Validate method')

	const { type, amount } = req.body
	const errors = [];

	if(!validator.isIn(type, ['debit', 'credit'])){
		errors.push("Invalid type value.")
	}

	if(!validator.isInt(amount.toString())){
		errors.push("Invalid amount.")
	}

	if(errors.length > 0) {
		logger.error('Validate errors:', errors)
		return res.status(422).json({ errors });
	} else {
		next()
	}
}

module.exports = {
	validate
}