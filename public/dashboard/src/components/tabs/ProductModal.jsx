import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import Alert from 'react-bootstrap/Alert'
import { BASE_PATH } from '../../constants'
import axios from 'axios'

const ProductModal = props => {
  const {workingProduct, show, onHide, catagories, getMetaData, setWorkingProduct, initWorkingProduct} = props

  const [ imgCanUp, setImgCanUp ] = useState(true)

  const [ product, setProduct ] = useState(workingProduct)
  const [ activeCat, setActiveCat ] = useState({})

  const [ alert, setAlert ] = useState({props: {show: false}})
  const alertDeets = {
    success: {
      text: 'Success!',
      props: {
        show: true,
        variant: 'success'
      }
    },
    failure: {
      text: 'Failed to update. Dunno lol.',
      props: {
        show: true,
        variant: 'danger'
      }
    },
    autoClose: () => setTimeout(()=>setAlert({props: {show: false}}),3000)
  }

  useEffect(() => {
    setProduct({
      ...workingProduct,
      // eslint-disable-next-line
      price: parseFloat(/[\d\.]+/.exec(workingProduct.price)),
      // eslint-disable-next-line
      ship_cost: parseFloat(/[\d\.]+/.exec(workingProduct.ship_cost)),
    })
    workingProduct.catagory && setActiveCat(catagories.find(cat=>cat.id === workingProduct.catagory))
  },[workingProduct, catagories])

  const deleteProduct = () => {
    axios.delete(`${BASE_PATH}/api/store/products/${product.id}`)
    .then(()=>{
      setAlert(alertDeets.success)
      alertDeets.autoClose()
      setWorkingProduct(initWorkingProduct)
      getMetaData()
      setTimeout(onHide, 3000)
    }).catch(err=>{
      console.log(err)
      setAlert(alertDeets.failure)
      alertDeets.autoClose()
    })
  }

  const saveProduct = () => {
    const prodPath = () => product.id === 'new' ? '' : `/${product.id}`
    axios({
      method: 'post',
      url: `${BASE_PATH}/api/store/products${prodPath()}`,
      data: product
    }).then(()=>{
      setAlert(alertDeets.success)
      alertDeets.autoClose()
      setWorkingProduct(initWorkingProduct)
      getMetaData()
      setTimeout(onHide, 3000)
    }).catch(err=>{
      console.log(err)
      setAlert(alertDeets.failure)
      alertDeets.autoClose()
    })
  }

  const specsList = () => {
    if (!product.specs_values) { return }
    return activeCat.catagory_specs.map(catSpec=>{
      return (
        <Form.Row key={catSpec.type}>
          <Form.Label column sm={4} >{catSpec.type}</Form.Label>
          <Col>
            { catSpec.filter.values === 'numeric' ?
              <InputGroup>
                <Form.Control value={product.specs_values[catSpec.type]} onChange={e=>{productChange.spec(e, catSpec.type)}} type='number' />
                <InputGroup.Append>
                  <InputGroup.Text>{catSpec.unit}</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup > :
              <Form.Control value={product.specs_values[catSpec.type]} onChange={e=>{productChange.spec(e, catSpec.type)}} /> }
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
      setProduct({...product, catagory: cat.id, specs_values: {}})
      setActiveCat(cat)
    },
    spec: (e, type) => {
      const newPoduct = {...product, specs_values:{...product.specs_values ,[type]: e.target.value}}
      setProduct(newPoduct)
    },
    media_links: link => setProduct({...product, media_links: [...product.media_links, link]})
  }

  const uploadFile = e => {
    setImgCanUp(false)
    const img = e.target.files[0]
    axios({
      method: 'post',
      url: `${BASE_PATH}/api/images`,
      headers: {
        'Content-Type': 'application/octet-stream',
        'File-Name': img.name
      },
      data: img
    }).then(({data})=>{
      productChange.media_links(data)
      setImgCanUp(true)
    }).catch(console.log)
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton />
      <Modal.Body>
      <Alert {...alert.props} >{alert.text}</Alert>
        <Form>
          <Form.Group>
            <Form.Label><h5>Product Name</h5></Form.Label>
            <Form.Control value={product.name} onChange={productChange.name}/>
          </Form.Group>
          <Form.Group>
            <Form.Label><h5>Product Description</h5></Form.Label>
            <Form.Control as='textarea' style={{minHeight: '7rem'}} value={product.description} onChange={productChange.description}/>
          </Form.Group>

          <Form.Group>
            <Form.Control type='file' disabled={!imgCanUp} onChange={uploadFile} />
            { product.media_links.map((link, i)=><p key={`img-link-${i}`}>{/\/o\/(.+)\?/.exec(link)[1]}</p>) }
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
              <Dropdown >
                <Dropdown.Toggle variant='outline-primary'>{ activeCat.name || 'Select'}</Dropdown.Toggle>
                <Dropdown.Menu>
                  { catagories.map(cat=><Dropdown.Item key={`kat-name-${cat.id}`} onClick={()=>productChange.catagory(cat)}>{cat.name}</Dropdown.Item>) }
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
          <Form.Row style={{justifyContent: 'space-between'}}>
            <Button onClick={deleteProduct} disabled={product.id === 'new' ? true : false}>Delete</Button>
            <Button onClick={saveProduct}>Save</Button>
          </Form.Row>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ProductModal
