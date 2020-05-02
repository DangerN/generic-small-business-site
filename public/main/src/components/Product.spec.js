import React from 'react'
import Product from './Product'
import { shallow } from 'enzyme'
import { MemoryRouter as Router } from 'react-router'

it('renders without crashing', () => {
  shallow(
    <Router initialEntries={['/store/4']} >
      <Product />
    </Router>
  )
})
