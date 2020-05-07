import React, {useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import ProductModal from './ProductModal'

const StoreTab = props => {
  const [ showModal, setModal ] = useState(false)
  const [ workingProduct, setWorkingProduct ] = useState({})

  const handlePoductSelect = product => {
    setWorkingProduct(product)
    setModal(true)
  }

  const handleModalClose = () => {
    setModal(false)
    setWorkingProduct({})
  }

  const makeProductTable = () => {
    return props.products.map((product)=>{
      return (
        <tr key={product.id} onClick={()=>handlePoductSelect(product)}>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{product.catagory}</td>
          <td>{product.price}</td>
          <td>{product.ship_cost}</td>
          <td>{product.stock}</td>
        </tr>
      )
    })
  }

  return (
    <Row>
      <ProductModal updateProduct={props.updateProduct} show={showModal} workingProduct={workingProduct} setWorkingProduct={setWorkingProduct} onHide={handleModalClose}/>
      <Col xs={2}>
        <Button onClick={()=>setModal(true)}>Add Product</Button>
      </Col>
      <Col xs={10}>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Catagory</th>
              <th>Price</th>
              <th>Ship Cost</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {props.products && makeProductTable()}
          </tbody>
        </Table>
      </Col>
    </Row>
  )
}

export default StoreTab
