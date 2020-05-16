import React, { useState, useEffect } from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import Product from './Product'
import StoreSidebar from './StoreSidebar'
import Filter from './Filter'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import useColor from '../hooks/useColor'
import ProductCard from './ProductCard'

const Store = props => {
  // eslint-disable-next-line
  const { products, dispatch, catagories } = props
  // eslint-disable-next-line
  let { path, url } = useRouteMatch()

  const linkColor = useColor('link')

  const [ activeCat, setActiveCat ] = useState()
  const [ filter, setFilter ] = useState({})
  // eslint-disable-next-line
  const [ catProducts, setCatProducts ] = useState([])

  useEffect(() => {
    if (!activeCat) {
      setCatProducts(products)
      return
    }
    let filteredProducts = products.filter(product=>product.catagory===activeCat.id)
    setCatProducts(filteredProducts)
  }, [activeCat, products])

  const genProductCards = () => {
    return products.map(product=>{
      return <ProductCard key={`product-${product.id}`} {...product} linkColor={linkColor} />
    })
  }

  return (
    <Row>
      <Route exact path={path}>
        <StoreSidebar activeCat={activeCat} setFilter={setFilter} setActiveCat={setActiveCat} catagories={catagories} style={{height: '92vh', overflow: 'scroll'}}/>
      </Route>
      <Col xs={9} lg={10}>
        <Container style={{height: '92vh', overflow: 'scroll'}}>
          <Switch>
            <Route exact path={path}>
              {activeCat ? <Filter {...props} filter={filter} setFilter={setFilter} activeCat={activeCat} /> : null}
              <Row>
                { genProductCards() }
              </Row>
            </Route>
            <Route path={`${path}/:productId`}>
              {products.length ? <Product {...props} /> : "spinner"}
            </Route>
          </Switch>
        </Container>
      </Col>
    </Row>
  )
}

export default Store
