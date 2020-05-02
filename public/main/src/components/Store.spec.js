import React from 'react'
import Store from './Store'
import { shallow } from 'enzyme'
import { MemoryRouter as Router } from 'react-router'

it('renders without crashing', () => {
  shallow(
    <Router initialEntries={['/store']}>
      <Store />
    </Router>
  )
})
