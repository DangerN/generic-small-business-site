import React from 'react'
import Navi from './Navi'
import { Navbar, Nav } from 'react-bootstrap'
import { shallow } from 'enzyme'


describe('<Navi />', () => {
  it('renders without crashing', () => {
    shallow(<Navi meta={{"":""}} />)
  })

  it('renders nav links', () => {
    const wrapper = shallow(<Navi meta={{"":""}} />)
    wrapper.find(Navbar.Brand).should.have.lengthOf(1)
    wrapper.find(Nav.Link).should.have.lengthOf(5)
  })
})
