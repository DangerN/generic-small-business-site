const request = require('supertest');
const sinon = require('sinon');
const api = require('../routes/api')
const express = require('express');
const app = express();

app.use(express.json())
app.use('/api', api);


describe('blog', () => {
  let stub
  before(() => {
    // this mocks the call to pg. all params are an array
    stub = sinon.stub(require('../db'), 'query').callsFake(function fakeDB(text, params) {
      const fakeQueries = {
        'select * from posts': () => {
          return {rows: [{id: 1}, {id: 2}, {id: 3}]}
        },
        'select * from posts where id = $1': (params) => {
          return {rows: [{id: params[0]}]}
        },
        'insert into posts (title, body) values ($1, $2) returning *': (params) => {
          return {rows: [{id: 1, title: params[0], body: params[1]}]}
        }
      }
      return Promise.resolve(fakeQueries[text](params))
    })
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
