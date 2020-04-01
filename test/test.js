// const chai = require('chai')
// chai.should()
//
// describe("Having a test", function () {
//   it('should have a test', function () {
//     "test".should.eq("test")
//   })
// })

const request = require('supertest');
const api = require('../routes/api')
const express = require('express');
const app = express()

app.use('/api', api)

describe('blog', () => {
  describe("GET /api/blog", () => {
    it('responds with JSON blog posts', function (done) {
      request(app)
        .get('/api/blog')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    })
  })
  describe("POST /api/blog", () => {
    it('responds with JSON', function (done) {
      request(app)
        .post('/api/blog')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done);
    })
    // Enable this later!
    // it('responds with newly created post info', function (done) {
    //   request(app)
    //     .post('/api/blog')
    //     .set('Accept', 'application/json')
    //     .expect('Content-Type', /json/)
    //     .expect(false)
    //     .expect(201, done);
    // })
  })
})

describe('store', () => {
  describe("GET /api/store", () => {
    it('returns JSON', function (done) {
      request(app)
        .get('/api/store')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    })
  })
  describe("GET /api/store/products", () => {
    it('returns JSON', function (done) {
      request(app)
        .get('/api/store')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    })
  })
})
