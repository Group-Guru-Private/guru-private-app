const request = require('supertest')
const app = require('../app')
const {Student, sequelize } = require('../models')
const {queryInterface} = sequelize

const registStudent = {
  name: "Student2",
  email: 'student2@mail.com',
  password: '123456',
  role: 'student',
  address: 'Jl. Mangga harum manis',
  position: [-6.200000, 106.816666],
  telpon_number: '08123456789'
}

// beforeAll(async (registStudent) => {
//   try {
//     await Student.create(registStudent)
//     done()
//   }catch(err) {
//     done(err)
//   }
// })
afterAll(async (done)=>{
  try{
    await queryInterface.bulkDelete('Students', null, {})
    done()
  }catch(err){
    done(err)
  }
})


describe('Register Student POST /students/register', () => {
  describe('Success register', () => {
    test('should response with data name and email students', (done) => {
      request(app)
        .post('/students/register')
        .send({
          name: "Student2",
          email: 'student2@mail.com',
          password: '123456',
          role: 'student',
          address: 'Jl. Mangga harum manis',
          position: [-6.200000, 106.816666],
          telpon_number: '08123456789'
        })
        .end((err, res) => {
          const {body, status} = res
          if (err) {
            return done(err)
          }
          expect(status).toBe(201)
          expect(body).toHaveProperty('name')
          expect(body).toHaveProperty('email')
          done()
        })
    })
    
  })
  describe('Failed register: Validation Error (Required: Name)', () => {
    test('should response with error message', (done) => {
      request(app)
        .post('/students/register')
        .send({
        
            name: "",
            email: 'student2@mail.com',
            password: '123456',
            role: 'student',
            address: 'Jl. Mangga harum manis',
            position: [-6.200000, 106.816666],
            telpon_number: '08123456789'
          
        })
        .end((err, res) => {
          const {body, status} = res
          if (err) {
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message','Name is required')
          done()
        })
    })
    
  })
  describe('Failed register: Validation Error (Required Email)', () => {
    test('should response with error message', (done) => {
      request(app)
        .post('/students/register')
        .send({
          
            name: "Student2",
            email: '',
            password: '123456',
            role: 'student',
            address: 'Jl. Mangga harum manis',
            position: [-6.200000, 106.816666],
            telpon_number: '08123456789'
          
        })
        .end((err, res) => {
          const {body, status} = res
          if (err) {
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message',)
          done()
        })
    })
  })

  describe('Failed register: Validation Error (Invalid Email Format)', () => {
    test('should response with error message', (done) => {
      request(app)
        .post('/students/register')
        .send({
          
            name: "Student2",
            email: 'salah email',
            password: '123456',
            role: 'student',
            address: 'Jl. Mangga harum manis',
            position: [-6.200000, 106.816666],
            telpon_number: '08123456789'
          
        })
        .end((err, res) => {
          const {body, status} = res
          if (err) {
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message',`Invalid email format`)
          done()
        })
    })
  })

  describe('Failed register: Validation Error (Duplicate regitester Email)', () => {
    test('should response with error message', (done) => {
      request(app)
        .post('/students/register')
        .send({
          
            name: "Student2",
            email: 'student2@mail.com',
            password: '123456',
            role: 'student',
            address: 'Jl. Mangga harum manis',
            position: [-6.200000, 106.816666],
            telpon_number: '08123456789'
          
        })
        .end((err, res) => {
          const {body, status} = res
          if (err) {
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message',`Email has already registered`)
          done()
        })
    })
  })


  describe('Failed register: Validation Error (Required Role)', () => {
    test('should response with error message', (done) => {
      request(app)
        .post('/students/register')
        .send({
          
            name: "Student2",
            email: 'student2@mail.com',
            password: '123456',
            role: '',
            address: 'Jl. Mangga harum manis',
            position: [-6.200000, 106.816666],
            telpon_number: '08123456789'
          
        })
        .end((err, res) => {
          const {body, status} = res
          if (err) {
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message',"Role is required")
          done()
        })
    })
  })

  describe('Failed register: Validation Error (Required Address)', () => {
    test('should response with error message', (done) => {
      request(app)
        .post('/students/register')
        .send({
          
            name: "Student2",
            email: 'sstudent2@mail.com',
            password: '123456',
            role: 'student',
            address: '',
            position: [-6.200000, 106.816666],
            telpon_number: '08123456789'
          
        })
        .end((err, res) => {
          const {body, status} = res
          if (err) {
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message',"Address is required")
          done()
        })
    })
  })

  describe('Failed register: Validation Error (Required Telphone Number)', () => {
    test('should response with error message', (done) => {
      request(app)
        .post('/students/register')
        .send({
          
            name: "Student2",
            email: 'student2@mail.com',
            password: '123456',
            role: 'Student',
            address: 'Jl. Mangga harum manis',
            position: [-6.200000, 106.816666],
            telpon_number: ''
          
        })
        .end((err, res) => {
          const {body, status} = res
          if (err) {
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message',`Telphone Number is required`)
          done()
        })
    })
  })

  describe('Failed register: Validation Error (Required Password)', () => {
    test('should response with error message', (done) => {
      request(app)
        .post('/students/register')
        .send({
          
            name: "Student2",
            email: 'student2@mail.com',
            password: '',
            role: 'Student',
            address: 'Jl. Mangga harum manis',
            position: [-6.200000, 106.816666],
            telpon_number: '12345'
          
        })
        .end((err, res) => {
          const {body, status} = res
          if (err) {
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message',`Invalid Password`)
          done()
        })
    })
  })
  
})



