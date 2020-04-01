const chai = require('chai')
chai.should()

const orm = require('../models');

describe('post', function () {
  describe('#getAll', function () {
    it('should return all posts as array', function () {
      orm.post.getAll.should.be.a('array')
    })
  })
  describe('#getOne', function () {
    it('should return one post as object', function () {
      orm.post.getAll.should.be.a('object')
    })
  })
})

describe('product', function () {
  describe('#getAll', function () {
    it('should return all products as array', function () {
      orm.product.getAll.should.be.a('array')
    })
  })
  describe('#getOne', function () {
    it('should return one product as object', function () {
      orm.product.getAll.should.be.a('object')
    })
  })
})
