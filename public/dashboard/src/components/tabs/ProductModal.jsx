import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'

const ProductModal = props => {
  const [ edit, setEdit ] = useState(false)
  const {workingProduct, setWorkingProduct, show, onHide, updateProduct, catagories} = props
  console.log(props);
  const [ activeCat, setActiveCat ] = useState({})

  const handleChange = (event, field) => {
    if (field === 'oversell') {
      setWorkingProduct({...workingProduct, [field]: event.target.checked})
      return
    }
    setWorkingProduct({...workingProduct, [field]: event.target.value})
  }

  const specsList = () => {
    console.log(activeCat);
    return activeCat.catagory_specs.map(catSpec=>{
      return (
        <Form.Row>
          <Form.Label column sm={4} >{catSpec.type}</Form.Label>
          <Col>
            { catSpec.filter.values === 'numeric' ?
              <InputGroup>
                <Form.Control type='number' />
                <InputGroup.Append>
                  <InputGroup.Text>{catSpec.unit}</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup> :
              <Form.Control /> }
          </Col>
        </Form.Row>
      )
    })
  }

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton />
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label><h5>Product Name</h5></Form.Label>
            <Form.Control type='text' />
          </Form.Group>
          <Form.Group>
            <Form.Label><h5>Product Description</h5></Form.Label>
            <Form.Control as='textarea' style={{minHeight: '7rem'}} />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} md='3'>
              <Form.Label><h5>Stock</h5></Form.Label>
              <Form.Control type='number' />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label><h5>Price</h5></Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type='number' />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label><h5>Shipping</h5></Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type='number' />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Check label='Allow negative stock' />
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label><h5>Catagory</h5></Form.Label>
            </Form.Group>
            <Form.Group as={Col}>
              <Dropdown>
                <Dropdown.Toggle>{ activeCat.name || 'Select'}</Dropdown.Toggle>
                <Dropdown.Menu>
                  { catagories.map(cat=><Dropdown.Item onClick={()=>setActiveCat(cat)}>{cat.name}</Dropdown.Item>) }
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm={3}>
              <Form.Label><h5>Specs</h5></Form.Label>
            </Form.Group>
            <Form.Group as={Col}>
              { activeCat.catagory_specs && specsList() }
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Button>Save</Button>
          </Form.Row>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ProductModal
