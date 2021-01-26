const router = require('express').Router()
const OrderController = require('../controllers/orderController')
const authStudent = require('../middleware/authStudent')
const authorizationOrder = require('../middleware/authorizationOrder')

router.get('/', OrderController.findAllOrder)
router.get('/:id', OrderController.getDetail)

router.use(authStudent)
router.post('/:id', OrderController.createOrder)  //id Teacher

//---- perlu authorization
router.use('/:id',authorizationOrder)
router.patch('/:id', OrderController.finishedOrder) // id Order
router.delete('/:id', OrderController.cancelOrder)  //id Order
router.put('/:id', OrderController.inputRating) //id Order

module.exports = router