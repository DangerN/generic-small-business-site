import React from 'react'
import Navi from './Navi'
import { A } from 'hookrouter'
import Navbar from 'react-bootstrap/Navbar'
import { shallow } from 'enzyme'


describe('<Navi />', () => {
  it('renders without crashing', () => {
    shallow(<Navi />)
  })

  it('renders nav links', () => {
    const wrapper = shallow(<Navi />)
    wrapper.find(Navbar.Brand).should.have.lengthOf(1)
    wrapper.find(A).should.have.lengthOf(3)
  })
})
