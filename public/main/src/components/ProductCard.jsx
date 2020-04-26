import React from 'react'
import Card from 'react-bootstrap/Card'

const ProductCard = props => {
  console.log(props);
  const { id, name, description, catagory, price, media_links } = props
  return (
    <Card key={id} style={{width: '18rem'}}>
      <Card.Img src={media_links[0]}/>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
