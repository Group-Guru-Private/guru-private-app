const router = require('express').Router()
const {order} = require('../controllers')
const authStudent = require('../middleware/authStudent')
const authorizationOrder = require('../middleware/authorizationOrder')

router.get('/', order.findAllOrder)
router.get('/:id', order.getDetail)

router.use(authStudent)
router.post('/:id', order.createOrder)

//---- perlu authorization
router.use('/:id',authorizationOrder)
router.patch('/:id', order.finishedOrder)
router.delete('/:id', order.cancelOrder)

module.exports = router