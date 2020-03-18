const router = require('express').Router();
const route_post = require('./route_post');
const route_auth = require('./route_auth');
const api = require('../api');




router.use('/auth', route_auth);
router.use('/post', (req, res) => {console.log('++++++++log', req.body)} , route_post);


module.exports = router;