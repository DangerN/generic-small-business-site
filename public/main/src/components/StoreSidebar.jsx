import React from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import useColor from '../hooks/useColor'

const StoreSidebar = props => {
  const buttonColor = useColor('button')
  const { catagories, setActiveCat, setFilter } = props

  const handleClick = cat => {
    setActiveCat(cat)
    setFilter({})
  }

  const displayCats = () => {
    return props.catagories.map((cat) => {
      return (
        <Button variant='outline-primary' onClick={()=>handleClick(cat)} >{cat.name}</Button>
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
