import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const ProductModal = props => {
  console.log(props);
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{props.name}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button>Edit</Button>
        <Button>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProductModal
