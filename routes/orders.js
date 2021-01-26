const router = require('express').Router()
const OrderController = require('../controllers/orderController')
const authStudent = require('../middleware/authStudent')
const authorizationOrder = require('../middleware/authorizationOrder')

router.get('/', OrderController.findAllOrder)
router.get('/:id', OrderController.getDetail)   // id order

router.use(authStudent) // dari sini BUTUH HEADERS 'access_token' STUDENT
router.post('/:id', OrderController.createOrder)  //id Teacher

//---- perlu authorization
router.use('/:id',authorizationOrder)
router.patch('/:id', OrderController.finishedOrder) // id Order
router.delete('/:id', OrderController.cancelOrder)  //id Order
router.put('/:id', OrderController.inputRating) //id Order

module.exports = router

/*recruitments

1. POST  /:id
  - params ---> id Teacher
  - body ---> subject, distance, total_price, date

2. GET /:id
  - params ---> id Order

3. PATCH /:id
  - params ---> id Order

4. DELETE /:id
  - params ---> id Order

5. PUT /:id
  - params ---> id Order
  - body ---> rating
*/