const request = require('supertest')
const app = require('../app')
const {Student, sequelize } = require('../models')
const {queryInterface} = sequelize
const {generateToken} = require('../helpers/jwtHelper') 



const registStudent = {
  name: "Student2",
  email: 'studentgetALL@mail.com',
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
    console.log(data)
    done()
  }catch(err) {
    console.log(err)
    done(err)
  }
})
// afterAll(async (done)=>{
//   try{
//     await queryInterface.bulkDelete('Students', null, {})
//     done()
//   }catch(err){
//     done(err)
//   }
// })


describe('Get Student GET /students', () => {
  describe('Success getAll', () => {
    test('should response with data All student', (done) => {
      request(app)
        .get('/students/')
        .set('access_token', access_token)
        .end((err, res) => {
          const {body, status} = res
          if (err) {
            return done(err)
          }
          expect(status).toBe(200)
          expect(body).toMatchObject({alldata: expect.any(Array)})
          done()
        })
    })
  })
  describe('Success getbyId', () => {
    test('should response with data student/:id', (done) => {
      request(app)
        .get('/students/' + id)
        .set('access_token', access_token)
        .end((err, res) => {
          const {body, status} = res
          if (err) {
            return done(err)
          }
          expect(status).toBe(200)
        
          done()
        })
    })
    
  })

})