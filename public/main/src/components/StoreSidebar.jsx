import React from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const StoreSidebar = props => {
  console.log(props);
  const displayCats = () => {
    return props.catagories.map(cat => {
      return (
        <Button>{cat.name}</Button>
      )
    })
  }
  return (
    <Col xs={3} lg={2}>
      { displayCats() }
    </Col>
  )
}

export default StoreSidebar
