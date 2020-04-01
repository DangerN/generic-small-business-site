import React from 'react'
import BlogTab from './BlogTab'
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  shallow(<BlogTab />)
})
