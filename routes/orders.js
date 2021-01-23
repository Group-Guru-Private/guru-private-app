const router = require('express').Router()
const OrderController = require('../controllers/orderController')
const authStudent = require('../middleware/authStudent')
const authorizationOrder = require('../middleware/authorizationOrder')

router.get('/', OrderController.findAllOrder)
router.get('/:id', OrderController.getDetail)

router.use(authStudent)
router.post('/:id', OrderController.createOrder)

//---- perlu authorization
router.use('/:id',authorizationOrder)
router.patch('/:id', OrderController.finishedOrder)
router.delete('/:id', OrderController.cancelOrder)

module.exports = router