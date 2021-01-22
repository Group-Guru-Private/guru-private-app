const {Student, Teacher, Order} = require('../models')

class OrderController {
  static async createOrder (req, res, next) {
    try {
      const findTeacher = await Teacher.findByPk(req.params.id)
      if (findTeacher) {
        const payload = {
          StudentId : 1,  //req.loginStudent.id
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
  static async findAllOrder (req, res, next) {
    try {
      const data = await Order.findAll({ include: [Student, Teacher] })
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error'} )
    }
  }

  static async getDetail (req, res, next) {
    try {
      const data = await Order.findByPk(req.params.id, {include: [Student, Teacher]})
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error'} )
    }
  }

  static async finishedOrder (req, res, next) {
    try {
      const findOrder = await Order.findByPk(req.params.id)
      if (findOrder) {
        const payload = {...findOrder, status: true}
        const finished = await Order.update(payload, { where: {id: req.params.id}, returning: true})
        res.status(200).json(finished)
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error'} )
    }
  }
  static async cancelOrder (req, res, next) {
    try { //perlu authorization 
      const data = await Order.destroy({ where: {id: req.params.id }})
      res.status(200).json({ message: `Successfully deleted this order !!!` })
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error'} )
    }
  }
}

module.exports = OrderController