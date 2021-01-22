const request = require('supertest')
const app = require('../app')
const {Student} = require('../models')



describe('Login Student POST /students/login', () => {
  describe('Success login', () => {
    test.only('should response with access_token', (done) => {
      request(app)
        .post('/students/login')
        .send({
          email: 'student2@mail.com',
          password: '123456',
        })
        .end((err, res) => {
          const {body, status} = res
          if (err) {
            return done(err)
          }
          expect(status).toBe(200)
          expect(body).toHaveProperty('access_token')
          done()
        })
    })
    
  })

  // describe('Failed login: Validation Error (Required Password)', () => {
  //   test.only('should response with error message', (done) => {
  //     request(app)
  //       .post('/students/login')
  //       .send({
          
  //           name: "Student2",
  //           email: 'student2@mail.com',
  //           password: '',
  //           role: 'Student',
  //           address: 'Jl. Mangga harum manis',
  //           position: [-6.200000, 106.816666],
  //           telpon_number: '12345'
          
  //       })
  //       .end((err, res) => {
  //         const {body, status} = res
  //         if (err) {
  //           return done(err)
  //         }
  //         expect(status).toBe(400)
  //         expect(body).toHaveProperty('message',`Invalid Password`)
  //         done()
  //       })
  //   })
  // })
  
})



