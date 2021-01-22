const {Student, Teacher, Order} = require('../models')

class OrderController {
  static async createOrder (req, res, next) {
    try {
      const findTeacher = await Teacher.findByPk(req.params.id)
      if (findTeacher) {
        // res.status(200).json(findTeacher)
        const payload = {
          StudentId : 1,
          TeacherId : findTeacher.id,
          subject : req.body.subject,
          distance : +req.body.distance,
          total_price : (+req.body.distance * 5000) + findTeacher.price,
          date: req.body.date,
        }
        const data = await Order.create(payload)
        res.status(201).json(data)
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error'} )
    }
  }
}

module.exports = OrderController