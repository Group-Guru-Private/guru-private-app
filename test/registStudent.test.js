const request = require('supertest')
const app = require('../app')
const {Student} = require('../models')

const registStudent = {
  name: 'Student2',
  email: 'student2@mail.com',
  password: '123456',
  role: 'student',
  address: 'Jl. Mangga harum manis',
  position: [-6.200000, 106.816666],
  telpon_number: '08123456789'
}

describe('Register Student POST /students/register', () => {
  describe('Success register', () => {
    test('should response with data name and email students', (done) => {
      request(app)
        .post('/students/register')
        .send(registStudent)
        .end((err, res) => {
          const {body, status} = res
          if (err) {
            return done(err)
          }
          expect(status).toBe(201)
          expect(body).toHaveProperty('name', registStudent.name)
          expect(body).toHaveProperty('email', registStudent.email)
          done()
        })
    })
    
  })
  
})
