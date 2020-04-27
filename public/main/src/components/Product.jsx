import React from 'react'
import { useParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'

const Product = props => {
  let { productId } = useParams()
  console.log(productId);
  console.log(props.products);
  const { name, description, media_links, price } = props.products.find(product=>product.id.toString() === productId)
  const carouselImgs = media_links.map(link=>(
    <Carousel.Item>
      <img src={link} width='300' className="d-block w-100" />
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
      </Col>
    </>
  )
}

export default Product
