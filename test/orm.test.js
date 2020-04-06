const chai = require('chai')
const sinon = require('sinon');
chai.should()

const orm = require('../models');

describe('post', function () {
  let stub
  before(() => {
    stub = sinon.stub(require('../db'), 'query').callsFake(function (text, params, callback) {
      console.log(text);
      console.log('in stub', callback);
      console.log('in voked', callback('sneed'));
      console.log(params);
      switch (params) {
        case '':
          console.log('blank case');
          return [{}, {}]
        case /\d/:
          return {id: params}
      }
      return 'benis'
    })
  })
  after(() => {
    stub.restore()
  })
  describe('#getAll', function () {
    it('should return all posts as array', function () {
      console.log(29, orm.post.getAll());
      orm.post.getAll().should.be.a('array')
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
