const chai = require('chai')
const sinon = require('sinon');
var chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised)
chai.should()

const orm = require('../models');

describe('post', function () {
  let stub
  before(() => {
    stub = sinon.stub(require('../db'), 'query')
    stub.withArgs().returns({rows: [{id: 1}, {id: 2}, {id: 3}]})
    stub.withArgs('select * from test where id=$1', [2]).returns({rows: [{id: 2}]})
    // stub = sinon.stub(require('../db'), 'query').callsFake((text, params) => {
    //   return {rows: [{id: 0}]}
    // })
  })
  after(() => {
    stub.restore()
  })
  describe('#getAll', function () {
    it('should return all posts as array', function () {
      return orm.post.getAll().should.eventually.be.a('array')
    })
  })
  describe('#getOne', function () {
    let onePost = orm.post.getOne(4)
    it('should return one post as object', function () {
      onePost.should.be.a('object')
    })
  })
})

describe('product', function () {
  describe('#getAll', function () {
    it('should return all products as array', function () {
      orm.product.getAll().should.be.a('array')
    })
  })
  describe('#getOne', function () {
    it('should return one product as object', function () {
      orm.product.getOne().should.be.a('object')
    })
  })
})

// const
