const request = require('supertest')
const app = require('../app')


describe('test GET /teachers', () => {
    it('test get teachers sukses', done => {
        request(app)
        .get('/teachers')
        .then(response => {
            const {body, status} = response
            expect(status).toEqual(200);
            expect(body[0]).toHaveProperty("name", expect.anything());
            expect(body[0]).toHaveProperty("email", expect.anything());
            expect(body[0]).toHaveProperty("role", expect.anything());
            expect(body[0]).toHaveProperty("address", expect.anything());
            expect(body[0]).toHaveProperty("position", expect.anything());
            expect(body[0]).toHaveProperty("telpon_number", expect.anything());
            expect(body[0]).toHaveProperty("subjects", expect.anything());
            expect(body[0]).toHaveProperty("background", expect.anything());
            expect(body[0]).toHaveProperty("price", expect.any(Number));
            expect(body[0]).toHaveProperty("image_url", expect.anything());
            done();
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })
})