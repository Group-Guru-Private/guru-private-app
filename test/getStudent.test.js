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

let access_token = ''
let id = ''
beforeAll(async (done)=>{
  try{
    const data = await Student.create(registStudent)
    if(data) access_token = generateToken({id: data.id,email: data.email})
    id = data.id
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


describe('Get Student GET /students', () => {
  describe('Success register', () => {
    test('should response with data name and email students', (done) => {
      request(app)
        .post('/students/')
        .acc({})
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