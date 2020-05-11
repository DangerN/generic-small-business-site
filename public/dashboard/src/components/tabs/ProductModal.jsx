import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'

const ProductModal = props => {
  const {workingProduct, show, onHide, updateProduct, catagories, catagoryList} = props
  const [ edit, setEdit ] = useState(false)

  const [ product, setProduct ] = useState(workingProduct)
  // console.log(props);
  console.log('product',product);
  const [ activeCat, setActiveCat ] = useState({})
  console.log('activeCat', activeCat);

  useEffect(() => {
    setProduct({
      ...workingProduct,
      price: parseFloat(/[\d\.]+/.exec(workingProduct.price)),
      ship_cost: parseFloat(/[\d\.]+/.exec(workingProduct.ship_cost)),
    })
    workingProduct.catagory && setActiveCat(catagories.find(cat=>cat.id === workingProduct.catagory))
  },[workingProduct])

  const specsList = () => {
    console.log(activeCat);
    return activeCat.catagory_specs.map(catSpec=>{
      return (
        <Form.Row>
          <Form.Label column sm={4} >{catSpec.type}</Form.Label>
          <Col>
            { catSpec.filter.values === 'numeric' ?
              <InputGroup>
                <Form.Control value={product.specs_values[catSpec.type]} type='number' />
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

  const productChange = {
    name: e => setProduct({...product, name: e.target.value}),
    description: e => setProduct({...product, description: e.target.value}),
    stock: e => setProduct({...product, stock: e.target.value}),
    price: e => setProduct({...product, price: e.target.value}),
    ship_cost: e => setProduct({...product, ship_cost: e.target.value}),
    oversell: e => setProduct({...product, oversell: e.target.checked}),
    catagory: cat => {
      setActiveCat(cat)
      setProduct({...product, catagory: cat.id, specs_values: {}})
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton />
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label><h5>Product Name</h5></Form.Label>
            <Form.Control value={product.name} onChange={productChange.name}/>
          </Form.Group>
          <Form.Group>
            <Form.Label><h5>Product Description</h5></Form.Label>
            <Form.Control as='textarea' style={{minHeight: '7rem'}} value={product.description} onChange={productChange.description}/>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} md='3'>
              <Form.Label><h5>Stock</h5></Form.Label>
              <Form.Control type='number' value={product.stock} onChange={productChange.stock}/>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label><h5>Price</h5></Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type='number' value={product.price} onChange={productChange.price}/>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label><h5>Shipping</h5></Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type='number' value={product.ship_cost} onChange={productChange.ship_cost}/>
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Check label='Allow negative stock' value={product.oversell} onChange={productChange.oversell} />
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label><h5>Catagory</h5></Form.Label>
            </Form.Group>
            <Form.Group as={Col}>
              <Dropdown>
                <Dropdown.Toggle>{ activeCat.name || 'Select'}</Dropdown.Toggle>
                <Dropdown.Menu>
                  { catagories.map(cat=><Dropdown.Item onClick={()=>productChange.catagory(cat)}>{cat.name}</Dropdown.Item>) }
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
          <Form.Row style={{justifyContent: 'flex-end'}}>
            <Button>Save</Button>
          </Form.Row>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ProductModal
