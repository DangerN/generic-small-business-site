import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import ProductCard from './ProductCard'

const Store = props => {
  const { products, dispatch } = props
  const renderProducts = () => products.map(ProductCard)
  return (
    <Container>
      <Row>
        { renderProducts() }
      </Row>
    </Container>
  )
}

export default Store
