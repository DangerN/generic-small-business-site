import React from 'react'
import ProductPreview from './ProductPreview'
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  shallow(<ProductPreview />)
})
