import React from 'react'
import StoreTab from './StoreTab'
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  shallow(<StoreTab meta={{}}/>)
})
