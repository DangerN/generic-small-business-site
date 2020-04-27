import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

const ProductCard = props => {
  const { id, name, description, catagory, price, media_links } = props
  return (
    <Card key={id} as={Col} xs={11} md={6} lg={3} style={{border: 'none'}}>
      <Card.Img src={media_links[0]}/>
      <Card.Body>
        <Card.Title as={Link} to={`/store/${id}`}>{name}</Card.Title>
        <Card.Text >{description.substring(0,100)+'...'}</Card.Text>
        <Card.Text>{price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductCard