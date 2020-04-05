const chai = require('chai')
const sinon = require('sinon');
chai.should()

const orm = require('../models');

describe('post', function () {
  let stub
  before(() => {
    stub = sinon.stub(require('../db'), 'query').callsFake(function (text, params, callback) {
      console.log(callback);
      switch (params) {
        case '':
          return [{}, {}]
        case /\d/:
          return {id: params}
      }
    })
    console.log('stubbed');
  })
  after(() => {
    stub.restore()
  })
  // describe('#getAll', function () {
  //   it('should return all posts as array', function () {
  //     console.log(orm.post.getAll());
  //     orm.post.getAll().should.be.a('array')
  //   })
  // })
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
