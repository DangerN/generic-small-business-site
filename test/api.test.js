require('dotenv').config()
const request = require('supertest');
const sinon = require('sinon');
const { fakePG } = require('./helpers');
const api = require('../routes/api')({})
const express = require('express');
const app = express();

app.use(express.json())
app.use('/api', api);


describe('blog', () => {
  let stub
  before(() => {
    stub = sinon.stub(require('../db'), 'query').callsFake(fakePG)
  })
  after(() => {
    stub.restore()
  })
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
        .send({'title': 'test', 'body': 'test'})
        .expect('Content-Type', /json/)
        .expect(201, done);
    })
    it('responds with text, title and id', function (done) {
      request(app)
        .post('/api/blog')
        .set('Accept', 'application/json')
        .send({'title': 'test', 'body': 'test'})
        .expect(({body})=>{
          if(!body.id) throw new Error('Missing id')
          if(!body.title) throw new Error('Missing title')
          if(!body.body) throw new Error('Missing body')
        })
        .end(done);
    })
  })
})

describe('store', () => {
  let stub
  before(() => {
    stub = sinon.stub(require('../db'), 'query').callsFake(fakePG)
  })
  after(() => {
    stub.restore()
  })
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
        .get('/api/store/products')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    })
  })
})

describe('/api', () => {
  it('returns 404', function (done) {
    request(app)
      .get('/')
      .expect(404, done)
  })
})
