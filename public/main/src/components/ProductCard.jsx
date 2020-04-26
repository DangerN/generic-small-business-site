import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

const ProductCard = props => {
  // console.log(props);
  const { id, name, description, catagory, price, media_links } = props
  console.log(media_links);
  return (
    <Card key={id} as={Col} xs={6} lg={3} style={{border: 'none'}}>
      <Card.Img src={media_links[0]}/>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text >{description.substring(0,100)+'...'}</Card.Text>
        <Card.Text>{price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
