const router = require('express').Router()
const {order} = require('../controllers')

router.get('/', order.findAllOrder)
router.post('/:id', order.createOrder)
//---- perlu authorization
router.get('/:id', order.getDetail)
router.patch('/:id', order.finishedOrder)
router.delete('/:id', order.cancelOrder)

module.exports = router