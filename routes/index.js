const router = require('express').Router()
const studentRouter = require('./students')
const teacherRouter = require('./teachers')
const orderRouter = require('./orders')

router.use('/students', studentRouter)
router.use('/teachers', teacherRouter)
router.use('/orders', orderRouter)

module.exports = router