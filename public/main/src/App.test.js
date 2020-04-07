import React from 'react'
import { shallow } from 'enzyme'
import App from './App';
import Navi from './components/Navi'
// import Landing from './components/Landing'
// import NotFoundPage from './components/NotFoundPage'

describe('renders itself and children', () => {
  it('renders', () => {
    shallow(<App />)
  });

  it('renders children', () => {
    const wrapper = shallow(<App />)
    wrapper.find(Navi).should.have.lengthOf(1)
  })

})

// // TODO: Implement rout testing.
// describe('renders display component based on path', () => {
//   beforeEach(() => {
//     navigate('/')
//   })
//   it('renders landing page at "/"', () => {
//     const wrapper = mount(<App />)
//     setPath('/')
//     console.log(window.location.pathname);
//     wrapper.find(Landing).should.have.lengthOf(2)
//   })
//
//   it('renders 404 with no match', () => {
//     const wrapper = mount(<App />)
//     setPath('/liudalksdfbanlsnajk')
//     console.log(window.location.pathname);
//     wrapper.find(Landing).should.have.lengthOf(2)
//     // wrapper.find(NotFoundPage).should.exist
//   })
// })
