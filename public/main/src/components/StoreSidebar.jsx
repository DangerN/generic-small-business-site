import React from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const StoreSidebar = props => {
  const { catagories, setActiveCat, setFilter } = props

  const handleClick = cat => {
    setActiveCat(cat)
    setFilter({})
  }

  const displayCats = () => {
    return catagories.map((cat) => {
      return (
        <Button key={`cat-${cat.name}`} variant='outline-primary' onClick={()=>handleClick(cat)} >{cat.name}</Button>
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
