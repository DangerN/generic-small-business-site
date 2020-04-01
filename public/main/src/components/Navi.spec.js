import React from 'react'
import Navi from './Navi'
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  shallow(<Navi />)
})
