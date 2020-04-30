import React from 'react'
import { useParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'

const Product = props => {
  let { productId } = useParams()
  // eslint-disable-next-line
  const { name, description, media_links, price } = props.products.find(product=>product.id == productId)
  const carouselImgs = media_links.map(link=>(
    <Carousel.Item>
      <img src={link} alt='product' width='300' className="d-block w-100" />
    </Carousel.Item>
  ))
  return (
    <>
      <Col s={12} md={6}>
        <Carousel interval={999999}>
          { carouselImgs }
        </Carousel>
      </Col>
      <Col>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>{price}</p>
        <Button>Add to Cart</Button>
      </Col>
    </>
  )
}

export default Product
