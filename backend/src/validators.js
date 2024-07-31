const { check, validationResult } = require('express-validator');

const validateBook = [
    check('title').notEmpty().withMessage('Title is required'),
    check('author').notEmpty().withMessage('Author is required'),
    check('year').isInt({ min: 1000, max: 9999 }).withMessage('Year must be a valid number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateBook };
