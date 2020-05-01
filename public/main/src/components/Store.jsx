import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import Product from './Product'
import StoreSidebar from './StoreSidebar'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import ProductCard from './ProductCard'

const Store = props => {
  const { products, dispatch } = props
  let { path, url } = useRouteMatch()
  return (
    <Row>
      <Route exact path={path}>
        <StoreSidebar style={{height: '92vh', overflow: 'scroll'}}/>
      </Route>
      <Col xs={9} lg={10}>
        <Row style={{height: '92vh', overflow: 'scroll'}}>
          <Switch>
            <Route exact path={path}>
              { products.map(ProductCard) }
            </Route>
            <Route path={`${path}/:productId`}>
              {products.length ? <Product {...props} /> : "spinner"}
            </Route>
          </Switch>
        </Row>
      </Col>
    </Row>
  )
}

export default Store
