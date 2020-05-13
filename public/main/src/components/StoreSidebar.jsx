import React from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import useColor from '../hooks/useColor'

const StoreSidebar = props => {
  const buttonColor = useColor('button')
  const { catagories, setActiveCat } = props

  console.log(props);
  const displayCats = () => {
    return props.catagories.map((cat) => {
      return (
        <Button variant='outline-primary' onClick={()=>setActiveCat(cat)} >{cat.name}</Button>
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
