import React from 'react'
import { useRouteMatch, Switch, Route, useParams } from 'react-router-dom'
import Product from './Product'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import ProductCard from './ProductCard'

const Store = props => {
  const { products, dispatch } = props
  let { path, url } = useRouteMatch()
  let productId = useParams()
  console.log(products);
  console.log(!!products.length);
  return (
    <Container>
      <Row>
        <Switch>
          <Route exact path={path}>
            { products.map(ProductCard) }
          </Route>
          <Route path={`${path}/:productId`}>
            {console.log(productId)}
            {products.length ? <Product {...props} /> : "spinner"}
          </Route>
        </Switch>
      </Row>
    </Container>
  )
}

export default Store
