const router = require('express').Router()
const {order} = require('../controllers')

router.post('/:id', order.createOrder)

module.exports = router