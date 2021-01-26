const request = require('supertest')
const app = require('../app')
const {Student, Teacher} = require('../models')
const {generateToken} = require('../helpers/jwtHelper')
const {generatePassword} = require('../helpers/passwordHelper')

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

const data = {
  subject: 'Mathematics',
  distance: 5,
  date: '2021-02-02'
}

let access_token_student = ''
let id_teacher = ''
let id_student = ''
beforeAll( async (done) => {
  try {
    const dataStudent = await Student.create(registStudent)
    const dataTeacher = await Teacher.create(registTeacher)
    if (dataStudent) {
      id_student = dataStudent.id
      access_token_student = generateToken({ id: dataStudent.id, email: dataStudent.email})      
    }
    if (dataTeacher) id_teacher = dataTeacher.id
    done()
  } catch (err) {
    done(err)
  }
})

afterAll( async (done) => {
  try {
    await Student.destroy({ where: {id: id_student }})
    await Teacher.destroy({ where: {id: id_teacher }})
    done()
  } catch (err) {
    done(err)
  }
})

describe('Create order POST /orders/:id', () => {
  describe('Success Create', () => {
    test('should response with data result', done => {
      request(app)
        .post('/orders/' + id_teacher)
        .set('access_token', access_token_student)
        .send(data)
        .end((err, res) => {
          const {body, status} = res
          if (err) return done(err)
          expect(status).toBe(201)
          expect(body).toHaveProperty('subject', 'Mathematics')
          done()
        })
    })
  })

  describe('Error Create because No Access Token', () => {
    test('should login first', (done) => {
      request(app)
        .post('/orders/' + id_teacher)
        .set('access_token', '')
        .send(data)
        .end((err, res) => {
          const {body, status} = res
          if (err) return done(err)
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'Login First')
          done()
        })
    })
  })
  
  describe('Error Create because Id Teacher Not Found', () => {
    test('response data not found', done => {
      request(app)
        .post('/orders/' + id_teacher + 5)
        .set('access_token', access_token_student)
        .send(data)
        .end((err, res) => {
          const {body, status} = res
          if (err) return done(err)
          expect(status).toBe(404)
          expect(body).toHaveProperty('message', 'Data Not Found')
          done()
        })
    })
  })

  describe('Error Create because Validation Error', () => {
    test('response with messages', done => {
      request(app)
        .post('/orders/' + id_teacher)
        .set('access_token', access_token_student)
        .send({
          subject: '',
          distance: data.distance,
          date: data.date
         })
        .end((err, res) => {
          const {body, status} = res
          if (err) return done(err)
          expect(status).toBe(400)
          expect(body).toHaveProperty('messages', ["Subject can't be empty"])
          done()
        })
    })
  })

})
