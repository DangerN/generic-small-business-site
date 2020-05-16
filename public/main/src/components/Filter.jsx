import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const Filter = props => {
  const { activeCat, filter, setFilter } = props
  console.log(filter);

  console.log('acivecat', activeCat);
  console.log(props);


  // types min max text
  // value
  // where it goes
  const changeFilter = (name, value, type) => {
    setFilter({...filter, [name]: {
      min: {...filter[name], min: value},
      max: {...filter[name], max: value},
      text: {...filter[name], text: value}
    }[type]})
  }

  const generateFilters = () => {
    return activeCat.catagory_specs.map(catSpec=>{
      return {
        string: () => {
          return (
            <Col md={4} key={`filter-${catSpec.type}`}>
              <Form.Group>
              <Form.Label>{catSpec.type}</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>{catSpec.unit}</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control />
                </InputGroup>
              </Form.Group>
            </Col>
          )
        },
        numeric: () => {
          return (
            <Col md={3} key={`filter-${catSpec.type}`}>
              <Form.Group>
                <Form.Label>{catSpec.type}</Form.Label>
                <InputGroup>
                  <Form.Control type='number' value={filter[catSpec.type] ? filter[catSpec.type].min : ''} onChange={e=>changeFilter(catSpec.type, e.target.value, 'min')} placeholder='Min'/>
                  <InputGroup.Append>
                    <InputGroup.Text>{catSpec.unit}</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
                <InputGroup>
                  <Form.Control type='number' value={filter[catSpec.type] ? filter[catSpec.type].max : ''} onChange={e=>changeFilter(catSpec.type, e.target.value, 'max')}  placeholder='Max' />
                  <InputGroup.Append>
                    <InputGroup.Text>{catSpec.unit}</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
            </Col>
          )
        }
      }[catSpec.filter.values]()
    })
  }


  return (
    <Row style={{backgroundColor: 'white'}}>
        { generateFilters() }
    </Row>
  )
}

export default Filter
