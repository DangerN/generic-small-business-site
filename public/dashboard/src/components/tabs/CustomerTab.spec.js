import React from 'react'
import CustomerTab from './CustomerTab'
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  shallow(<CustomerTab />)
})
