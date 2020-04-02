const chai = require('chai')
chai.should()

const orm = require('../models');

describe('post', function () {
  describe('#getAll', function () {
    it('should return all posts as array', function () {
      orm.post.getAll().should.be.a('array')
    })
  })
  describe('#getOne', function () {
    let onePost = orm.post.getOne()
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
