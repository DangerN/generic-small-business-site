const chai = require('chai')
const sinon = require('sinon');
var chaiAsPromised = require("chai-as-promised")
const { fakePG } = require('./helpers')

chai.use(chaiAsPromised)
chai.should()

const { post, product } = require('../models');

describe('post', function () {
  let stub
  before(() => {
    stub = sinon.stub(require('../db'), 'query').callsFake(fakePG)
  })
  after(() => {
    stub.restore()
  })
  describe('#getAll', function () {
    it('should return all posts as array', function () {
      return post.getAll().should.eventually.be.a('array')
    })
  })
  describe('#getOne', function () {
    let onePost = post.getOne(4)
    it('should return one post as object', function () {
      onePost.should.eventually.be.a('object')
    })
  })
})

describe('product', function () {
  let stub
  before(() => {
    stub = sinon.stub(require('../db'), 'query').callsFake(fakePG)
  })
  after(() => {
    stub.restore()
  })
  describe('#getAll', function () {
    it('should return all products as array', function () {
      return product.getAll().should.eventually.be.a('array')
    })
  })
  describe('#getOne', function () {
    it('should return one product as object', function () {
      product.getOne(1).should.eventually.be.a('object')
    })
  })
})
