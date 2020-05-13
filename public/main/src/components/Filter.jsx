import React from 'react'
import Row from 'react-bootstrap/Row'

const Filter = props => {
  const { activeCat } = props
  console.log('acivecat', activeCat);
  console.log(props);
  return (
    <Row>
      fucking hell
      {activeCat.catagory_specs.type}
    </Row>
  )
}

export default Filter
