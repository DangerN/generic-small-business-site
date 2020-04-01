import React from 'react'
import Product from './Product'
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  shallow(<Product />)
})
