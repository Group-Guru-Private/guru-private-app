const request = require('supertest')
const app = require('../app')
const {Student, Teacher, Order} = require('../models')
const {generateToken} = require('../helpers/jwtHelper')
const {generatePassword} = require('../helpers/passwordHelper')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize

const registStudent = {
  name: 'Student',
  email: 'student@mail.com',
  password: generatePassword('123456'),
  role: 'student',
  address: 'Jl. Mangga harum manis',
  position: [-6.200000, 106.816666],
  telpon_number: '08123456789'
}

const registSecondStudent = {
  name: 'Student',
  email: 'student2@mail.com',
  password: generatePassword('123456'),
  role: 'student',
  address: 'Jl. Mangga harum manis',
  position: [-6.200000, 106.816666],
  telpon_number: '08123456789'
}

const registTeacher =  {
  name: 'Teacher',
  email: 'teacher@mail.com',
  password: generatePassword('123456'),
  role: 'teacher',
  address: 'Jl. Mangga harum manis',
  position: [-6.200000, 106.816666],
  telpon_number: '08123456789',
  subjects: ['Mathematics', 'Chemistry'],
  background: 'Universitas ABC, S1 Mathematics',
  price: 100000,
  rating: 4,
  income: 0,
  available_status: false,
}

let access_token_student = ''
let failed_access_token = ''
let id_student = ''
let id_second_student = ''
let id_teacher = ''
let id_order = ''
let id_order_fail = ''
beforeAll( async (done) => {
  try {
    const dataStudent = await Student.create(registStudent)
    const dataTeacher = await Teacher.create(registTeacher)
    const dataSecondStudent = await Student.create(registSecondStudent)
    if (dataStudent && dataTeacher && dataSecondStudent ) {
      id_student = dataStudent.id
      id_second_student = dataSecondStudent.id
      id_teacher = dataTeacher.id
      access_token_student = generateToken({ id: dataStudent.id, email: dataStudent.email })
      failed_access_token = generateToken({ id: dataSecondStudent.id, email: dataSecondStudent.email })
      const payload = {
        StudentId: dataStudent.id,
        TeacherId: dataTeacher.id,
        subject: 'Mathematics',
        distance: 5,
        date: '2021-02-20',
        total_price: (5 * 5000) + dataTeacher.price
      }
      const secondPayload = {
        StudentId: dataStudent.id,
        TeacherId: dataTeacher.id,
        subject: 'Mathematics',
        distance: 5,
        date: '2021-02-28',
        total_price: (5 * 5000) + dataTeacher.price
      }
      const firstOrder = await Order.create(payload)
      const secondOrder = await Order.create(secondPayload)
      if (firstOrder && secondOrder) {
        id_order = firstOrder.id
        id_order_fail = secondOrder.id
        await Order.update({ status: true}, { where: {id: firstOrder.id}})
      }
      done()
    }
  } catch (err) {
    done(err)
  }
})

afterAll( async (done) => {
  try {
    await Student.destroy({ where: {id: id_student }})
    await Student.destroy({ where: {id: id_second_student }})
    await Teacher.destroy({ where: {id: id_teacher }})
    await queryInterface.bulkDelete('Orders')
    done()
  } catch (err) {
    done(err)
  }
})

describe('INPUT RATING order PUT /orders/:id', () => {
  describe('Success input', () => {
    test('should response with data result', done => {
      request(app)
        .put('/orders/' + id_order)
        .set('access_token', access_token_student)
        .send({ rating: 5 })
        .end((err, res) => {
          const {body, status} = res
          if (err) return done(err)
          expect(status).toBe(200)
          expect(body).toHaveProperty('Order')
          expect(body).toHaveProperty('Teacher')
          done()
        })
    })
  })

  describe('Error input because no access token', () => {
    test('should response to login first', done => {
      request(app)
        .put('/orders/' + id_order)
        .set('access_token', '')
        .send({ rating: 5 })
        .end((err, res) => {
          const {body, status} = res
          if (err) return done(err)
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'Login First')
          done()
        })
    })    
  })
  
  describe('Error input because wrong access token', () => {
    test('should response unauthorized', done => {
      request(app)
        .put('/orders/' + id_order)
        .send({ rating: 5 })
        .set('access_token', failed_access_token)
        .end((err, res) => {
          const {body, status} = res
          if (err) return done(err)
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', `You aren't authorized !`)
          done()
        })
    })    
  })

  describe('Error input because unpaid ', () => {
    test('should response to paid', done => {
      request(app)
        .put('/orders/' + id_order_fail)
        .set('access_token', access_token_student)
        .send({ rating: 5 })
        .end((err, res) => {
          const {body, status} = res
          if (err) return done(err)
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'Harap melakukan pembayaran terlebih dahulu')
          done()
        })
    })    
  })
})
