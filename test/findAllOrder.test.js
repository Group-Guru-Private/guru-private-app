const request = require('supertest')
const app = require('../app')
const {Student, Teacher, Order} = require('../models')
const {generatePassword} = require('../helpers/passwordHelper')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize

const registStudent = {
  name: 'Student2',
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

let id_student = ''
let id_teacher = ''
let id_order = ''
beforeAll( async (done) => {
  try {
    const dataStudent = await Student.create(registStudent)
    const dataTeacher = await Teacher.create(registTeacher)
    if (dataStudent && dataTeacher ) {
      id_student = dataStudent.id
      id_teacher = dataTeacher.id
      const payload = {
        StudentId: dataStudent.id,
        TeacherId: dataTeacher.id,
        subject: 'Mathematics',
        distance: 5,
        date: '2021-02-02',
        total_price: (5 * 5000) + dataTeacher.price
      }
      const result = await Order.create(payload)
      if (result) id_order = result.id
      done()
    }
  } catch (err) {
    done(err)
  }
})

afterAll( async (done) => {
  try {
    await Student.destroy({ where: {id: id_student }})
    await Teacher.destroy({ where: {id: id_teacher }})
    // await Order.destroy({ where: {id: id_order }})
    await queryInterface.bulkDelete('Orders')
    done()
  } catch (err) {
    done(err)
  }
})

describe('GET /orders', () => {
  describe('Success get', () => {
    test('should response with data', (done) => {
      request(app)
        .get('/orders')
        .end((err, res)=>{
          const { body, status } = res
          if(err) return done(err)
          expect(status).toBe(200)
          done()
        })    
    })
  })
})
