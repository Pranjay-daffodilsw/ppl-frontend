const router = require('express').Router();

router.get('./', (req, res) => {
    res.status(200).send('This is backend server.')
});











module.exports = Router;