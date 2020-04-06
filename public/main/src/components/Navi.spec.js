import React from 'react'
import Navi from './Navi'
import { shallow } from 'enzyme'


describe('<Navi />', () => {
  it('renders without crashing', () => {
    shallow(<Navi />)
  })

  it('renders nav links', () => {
    const wrapper = shallow(<Navi />)
    wrapper.find(<A />).should.have.lengthOf(3)
  })
})
