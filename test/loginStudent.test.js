const request = require('supertest')
const app = require('../app')
const {Student, sequelize } = require('../models')
const {queryInterface} = sequelize
const {generateToken} = require('../helpers/jwtHelper') 



const registStudent = {
  name: "Student2",
  email: 'student2@mail.com',
  password: '123456',
  role: 'student',
  address: 'Jl. Mangga harum manis',
  position: [-6.200000, 106.816666],
  telpon_number: '08123456789'
}

let access_token = ''
beforeAll(async (done)=>{
  try{
    const data = await Student.create(registStudent)
    if(data) access_token = generateToken({id: data.id,email: data.email})
    done()
  }catch(err){
    done(err)
  }
})
afterAll(async (done)=>{
  try{
    await Student.destroy({
      where: {email: registStudent.email}
    })
    done()
  }catch(err){
    done(err)
  }
})


describe('Login Student POST /students/login', () => {
  describe('Success login', () => {
    test('should response with access_token', (done) => {
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

  describe('Failed login: Required Password', () => {
    test('should response with error message', (done) => {
      request(app)
        .post('/students/login')
        .send({
        
            email: 'student2@mail.com',
            password: '',
          
        })
        .end((err, res) => {
          const {body, status} = res
          if (err) {
            return done(err)
          }
          expect(status).toBe(404)
          expect(body).toHaveProperty('message','Please input your Password')
          done()
        })
    })
  })

  describe('Failed login: Required Email', () => {
    test('should response with error message', (done) => {
      request(app)
        .post('/students/login')
        .send({
        
            email: '',
            password: '12345',
          
        })
        .end((err, res) => {
          const {body, status} = res
          if (err) {
            return done(err)
          }
          expect(status).toBe(404)
          expect(body).toHaveProperty('message','Please input your Email')
          done()
        })
    })
  })

  describe('Failed login: Invalid Password', () => {
    test('should response with error message', (done) => {
      request(app)
        .post('/students/login')
        .send({
        
            email: 'student2@mail.com',
            password: 'ab',
          
        })
        .end((err, res) => {
          const {body, status} = res
          if (err) {
            return done(err)
          }
          expect(status).toBe(404)
          expect(body).toHaveProperty('message','Invalid Email/Password')
          done()
        })
    })
  })

  describe('Failed login: Invalid Email', () => {
    test('should response with error message', (done) => {
      request(app)
        .post('/students/login')
        .send({
        
            email: 'stustudent2@mail.com',
            password: '12345',
          
        })
        .end((err, res) => {
          const {body, status} = res
          if (err) {
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message','Account Not Found')
          done()
        })
    })
  })
  
})



