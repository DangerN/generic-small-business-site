const chai = require('chai')
chai.should()

const orm = require('../models');

describe('post', function () {
  it('should exist', function () {
    orm.post.should.be.truthy()
  })
})

describe('product', function () {
  it('should exist', function () {
    orm.post.should.be.truthy()
  })
})
