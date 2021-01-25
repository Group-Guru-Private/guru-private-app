const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize
const {Teacher} = require('../models')
const { generatePassword } = require('../helpers/passwordHelper')
const { generateToken } = require('../helpers/jwtHelper')

const registTeacher = {
  name: 'Teacher',
  email: 'teacher@mail.com',
  password: generatePassword('123456'),
  role: 'teacher',
  address: 'Jl. Mangga harum manis',
  position: [-6.200000, 106.816666],
  telpon_number: '08123456789',
  subjects: ['Mathematics', 'Chemistry'],
  background: 'Universitas ABC, S1 Mathematics',
  price: 100000
}

const registGhostTeacher = {
  name: 'Ghost',
  email: 'ghost@mail.com',
  password: generatePassword('123456'),
  role: 'teacher',
  address: 'Jl. Mangga harum manis',
  position: [-6.200000, 106.816666],
  telpon_number: '08123456789',
  subjects: ['Mathematics', 'Chemistry'],
  background: 'Universitas ABC, S1 Mathematics',
  price: 100000
}

let access_token = ''
let failed_access_token = ''

beforeAll( async (done) => {
  try {
    const teacher = await Teacher.create(registTeacher)
    const ghostTeacher = await Teacher.create(registGhostTeacher)
    if (teacher && ghostTeacher) {
      access_token = generateToken({ id: teacher.id, email: teacher.email })
      failed_access_token = generateToken({ id: ghostTeacher.id, email: ghostTeacher.email})
    }
    done()
  } catch (err) {
    done(err)
  }
})

afterAll( done => {
  queryInterface.bulkDelete('Teachers')
    .then(() => {
      done()
    })
    .catch(err => {
      done(err)
    })
})

describe('PATCH Status Teacher ', () => {
  describe('Success change status', () => {
    test('should response with data', (done) => {
      request(app)
        .patch('/teachers')
        .send({ status: true })
        .set('access_token', access_token)
        .end((err, res) => {
          const {body, status} = res
          if (err) done(err)
          expect(status).toBe(200)
          expect(body).toHaveProperty('available_status', true)
          done()
        })
    })
  })
  
  describe('Error change status', () => {
    test('should response with data', (done) => {
      request(app)
        .patch('/teachers')
        .send({ status: true })
        .set('access_token', '')
        .end((err, res) => {
          const {body, status} = res
          if (err) done(err)
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'Login First')
          done()
        })
    })
  })
})
