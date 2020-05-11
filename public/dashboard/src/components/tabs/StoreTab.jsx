import React, {useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import ProductModal from './ProductModal'
import SettingModal from './SettingModal'

const StoreTab = props => {
  const [ showModal, setModal ] = useState(false)
  const [ settings, setSettings ] = useState(false)

  const initWorkingProduct = {
    id: 'new',
    name: '',
    description: '',
    stock: 0,
    price: 0.00,
    ship_cost: 0.00,
    media_links: []
  }

  const [ workingProduct, setWorkingProduct ] = useState(initWorkingProduct)

  const handlePoductSelect = product => {
    setWorkingProduct(product)
    setModal(true)
  }

  const handleModalClose = () => {
    setModal(false)
    setWorkingProduct(initWorkingProduct)
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
      { props.loaded ?
        <ProductModal
          updateProduct={props.updateProduct}
          show={showModal}
          {...props}
          workingProduct={workingProduct}
          setWorkingProduct={setWorkingProduct}
          onHide={handleModalClose}
          initWorkingProduct={initWorkingProduct}
        />
      : null}
      {props.loaded ?
        <SettingModal
          show={settings}
          onHide={()=>setSettings(false)}
          {...props}
        />
        : null}
      <Col xs={2} style={{justifyContent: 'center'}}>
        <Button onClick={()=>setModal(true)}>Add Product</Button>
        <Button onClick={()=>setSettings(true)}>Store Settings</Button>
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
