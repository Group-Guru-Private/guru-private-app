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
let id = ''
let access_token =''
beforeAll(async (done) => {
  try {
    const data = await Student.create(registStudent)
    if (data) {
      access_token = generateToken({id: data.id,email: data.email})
      id = data.id
    }
    done()
  }catch(err) {
    done(err)
  }
})
afterAll(async (done)=>{
  try{
    await queryInterface.bulkDelete('Students', null, {})
    done()
  }catch(err){
    done(err)
  }
})


describe('EDIT Student PUT/students/edit/:id', () => {
  describe('Success edit', () => {
    test('should response with success message', (done) => {
      request(app)
        .put(`/students/edit/${id}`)
        .set('access_token', access_token)
        .send({
        
          name: "Edit nih",
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
          expect(status).toBe(200)
          expect(body).toHaveProperty('message','Your profile Updated')
      
          done()
        })
    })
    
  })
  describe('Failed edit: Validation Error (Required: Name)', () => {
    test('should response with error message', (done) => {
      request(app)
        .put(`/students/edit/${id}`)
        .set('access_token', access_token)
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
  // describe('Failed edit: Validation Error (Required Email)', () => {
  //   test('should response with error message', (done) => {
  //     request(app)
  //       .put(`/students/edit/${id}`)
  //       .set('access_token', access_token)
  //       .send({
          
  //           name: "Student2",
  //           email: '',
  //           password: '123456',
  //           role: 'student',
  //           address: 'Jl. Mangga harum manis',
  //           position: [-6.200000, 106.816666],
  //           telpon_number: '08123456789'
          
  //       })
  //       .end((err, res) => {
  //         const {body, status} = res
  //         if (err) {
  //           return done(err)
  //         }
  //         expect(status).toBe(400)
  //         expect(body).toHaveProperty('message',)
  //         done()
  //       })
  //   })
  // })

  // describe('Failed edit: Validation Error (Invalid Email Format)', () => {
  //   test('should response with error message', (done) => {
  //     request(app)
  //       .put(`/students/edit/${id}`)
  //       .set('access_token', access_token)
  //       .send({
          
  //           name: "Student2",
  //           email: 'salah email',
  //           password: '123456',
  //           role: 'student',
  //           address: 'Jl. Mangga harum manis',
  //           position: [-6.200000, 106.816666],
  //           telpon_number: '08123456789'
          
  //       })
  //       .end((err, res) => {
  //         const {body, status} = res
  //         if (err) {
  //           return done(err)
  //         }
  //         expect(status).toBe(400)
  //         expect(body).toHaveProperty('message',`Invalid email format`)
  //         done()
  //       })
  //   })
  // })


  // describe('Failed edit: Validation Error (Required Role)', () => {
  //   test('should response with error message', (done) => {
  //     request(app)
  //       .put(`/students/edit/${id}`)
  //       .set('access_token', access_token)
  //       .send({
          
  //           name: "Student2",
  //           email: 'student2@mail.com',
  //           password: '123456',
  //           role: '',
  //           address: 'Jl. Mangga harum manis',
  //           position: [-6.200000, 106.816666],
  //           telpon_number: '08123456789'
          
  //       })
  //       .end((err, res) => {
  //         const {body, status} = res
  //         if (err) {
  //           return done(err)
  //         }
  //         expect(status).toBe(400)
  //         expect(body).toHaveProperty('message',"Role is required")
  //         done()
  //       })
  //   })
  // })

  describe('Failed edit: Validation Error (Required Address)', () => {
    test('should response with error message', (done) => {
      request(app)
        .put(`/students/edit/${id}`)
        .set('access_token', access_token)
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

  describe('Failed edit: Validation Error (Required Telphone Number)', () => {
    test('should response with error message', (done) => {
      request(app)
        .put(`/students/edit/${id}`)
        .set('access_token', access_token)
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

  
  
})



