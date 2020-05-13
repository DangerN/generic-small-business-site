import React, { useState } from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import Product from './Product'
import StoreSidebar from './StoreSidebar'
import Filter from './Filter'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import useColor from '../hooks/useColor'
import ProductCard from './ProductCard'

const Store = props => {
  // eslint-disable-next-line
  const { products, dispatch, catagories } = props
  // eslint-disable-next-line
  let { path, url } = useRouteMatch()

  const linkColor = useColor('link')

  const [ activeCat, setActiveCat ] = useState()

  const genProductCards = () => {
    return products.map(product=>{
      console.log('gener');
      return <ProductCard {...product} linkColor={linkColor} />
    })
  }

  console.log(props);

  return (
    <Row>
      <Route exact path={path}>
        <StoreSidebar activeCat={activeCat} setActiveCat={setActiveCat} catagories={catagories} style={{height: '92vh', overflow: 'scroll'}}/>
      </Route>
      <Col xs={9} lg={10}>
        <Row style={{height: '92vh', overflow: 'scroll'}}>
          <Switch>
            <Route exact path={path}>
              {activeCat ? <Filter {...props} activeCat={activeCat} /> : null}
              { genProductCards() }
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
