const request = require('supertest')
const app = require('../app')
const {Teacher, sequelize} = require('../models')
const {queryInterface} = sequelize
const { generatePassword } = require('../helpers/passwordHelper')
const { generateToken } = require('../helpers/jwtHelper')

const registTeacher = {
    name: 'bima',
    email: 'bima@mail.com',
    password: generatePassword('123456'),
    role: 'teacher',
    address: 'Jl. Mangga harum manis',
    position: [-6.200000, 106.816666],
    telpon_number: '08123456789',
    subjects: ['Mathematics', 'Chemistry'],
    background: 'Universitas ABC, S1 Mathematics',
    price: 100000
}

let id_teacher = ''
let access_token =''
beforeAll(async (done) => {
  try {
    const data = await Teacher.create(registTeacher)
    if (data) {
      access_token = generateToken({id: data.id, email: data.email})
      id_teacher = data.id
    }
    done()
  }catch(err) {
    done(err)
  }
})

afterAll(async (done)=>{
    try{
      await queryInterface.bulkDelete('Teachers', null, {})
      done()
    }catch(err){
      done(err)
    }
  })


describe('EDIT Teacher PUT/teachers:id', () => {
  describe('Success edit', () => {
    test('should response with success message', (done) => {
      request(app)
        .put(`/teachers/${id_teacher}`)
        .set('access_token', access_token)
        .send({
            name: 'krishna',
            email: 'bima@mail.com',
            password: generatePassword('123456'),
            role: 'teacher',
            address: 'Jl. Mangga harum manis',
            position: [-6.200000, 106.816666],
            telpon_number: '08123456789',
            subjects: ['Mathematics', 'Chemistry'],
            background: 'Universitas ABC, S1 Mathematics',
            price: 100000
      })
        .end((err, res) => {
          const {body, status} = res
          if (err) {
            return done(err)
          }
            expect(status).toBe(200)
            expect(body[0]).toHaveProperty("name", "krishna")
            expect(body[0]).toHaveProperty("email", "bima@mail.com")
            expect(body[0]).toHaveProperty("role", "teacher")
            expect(body[0]).toHaveProperty("address", "Jl. Mangga harum manis")
            expect(body[0]).toHaveProperty("position", [-6.200000, 106.816666])
            expect(body[0]).toHaveProperty("telpon_number", "08123456789")
            expect(body[0]).toHaveProperty("subjects", ["Mathematics", "Chemistry"])
            expect(body[0]).toHaveProperty("background", "Universitas ABC, S1 Mathematics")
            expect(body[0]).toHaveProperty("price", 100000)
            done()
        })
    })
  })
})