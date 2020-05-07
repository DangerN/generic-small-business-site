import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const ProductModal = props => {
  const [ edit, setEdit ] = useState(false)
  const {workingProduct, setWorkingProduct, show, onHide, updateProduct} = props

  const handleChange = (event, field) => {
    if (field === 'oversell') {
      setWorkingProduct({...workingProduct, [field]: event.target.checked})
      return
    }
    setWorkingProduct({...workingProduct, [field]: event.target.value})
  }

  console.log(workingProduct);
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{workingProduct.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control value={workingProduct.name} onChange={e=>handleChange(e, 'name')} readOnly={edit ? false : true} />
          <Form.Control value={workingProduct.description} onChange={e=>handleChange(e, 'description')} readOnly={edit ? false : true} />
          <Form.Control value={workingProduct.catagory} onChange={e=>handleChange(e, 'catagory')} readOnly={edit ? false : true} />
          <Form.Control value={workingProduct.price} onChange={e=>handleChange(e, 'price')} readOnly={edit ? false : true} />
          <Form.Control value={workingProduct.ship_cost} onChange={e=>handleChange(e, 'ship_cost')} readOnly={edit ? false : true} />
          <Form.Check checked={workingProduct.oversell} onChange={e=>handleChange(e, 'oversell')} disabled={edit ? false : true} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>setEdit(true)}>Edit</Button>
        <Button onClick={()=>updateProduct(workingProduct)}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProductModal
