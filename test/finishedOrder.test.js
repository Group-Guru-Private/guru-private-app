const request = require('supertest')
const app = require('../app')
const {Student, Teacher, Order} = require('../models')
const {generateToken} = require('../helpers/jwtHelper')
const {generatePassword} = require('../helpers/passwordHelper')

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
        date: '2020-02-02',
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
    await Student.destroy({ where: {id: id_second_student }})
    await Teacher.destroy({ where: {id: id_teacher }})
    await Order.destroy({ where: {id: id_order }})
    done()
  } catch (err) {
    done(err)
  }
})

describe('Finish order PATCH /orders/:id', () => {
  describe('Success finished', () => {
    test('should response with data result', done => {
      request(app)
        .patch('/orders/' + id_order)
        .set('access_token', access_token_student)
        .end((err, res) => {
          const {body, status} = res
          if (err) return done(err)
          expect(status).toBe(200)
          expect(body).toHaveProperty('id', id_order)
          expect(body).toHaveProperty('StudentId', id_student)
          expect(body).toHaveProperty('TeacherId', id_teacher)
          expect(body).toHaveProperty('status', true)
          done()
        })
    })
  })

  describe('Error finish because no access token', () => {
    test('should response to login first', done => {
      request(app)
        .patch('/orders/' + id_order)
        .set('access_token', '')
        .end((err, res) => {
          const {body, status} = res
          if (err) return done(err)
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'Login First')
          done()
        })
    })    
  })
  
  describe('Error finish because wrong access token', () => {
    test('should response unauthorized', done => {
      request(app)
        .patch('/orders/' + id_order)
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
})
