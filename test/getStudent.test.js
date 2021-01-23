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


describe('Get Student GET /students', () => {
  describe('Success register', () => {
    test('should response with data name and email students', (done) => {
      request(app)
        .post('/students/')
        .set('access_token', access_token)
        .end((err, res) => {
          const {body, status} = res
          if (err) {
            return done(err)
          }
          expect(status).toBe(201)
          expect(body).toHaveProperty('data', expect.any())
          done()
        })
    })
    
  })

})