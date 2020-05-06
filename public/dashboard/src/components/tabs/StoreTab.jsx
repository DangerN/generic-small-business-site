import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

const StoreTab = props => {
  console.log(props.products);
  const makeProductTable = () => {
    return props.products.map(({id, name, catagory, price, ship_cost, stock})=>{
      return (
        <tr onClick={()=>console.log(id)}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{catagory}</td>
          <td>{price}</td>
          <td>{ship_cost}</td>
          <td>{stock}</td>
        </tr>
      )
    })
  }

  return (
    <Row>
      <Col xs={2}>
        <Button>Add Product</Button>

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
            {makeProductTable()}
          </tbody>
        </Table>
      </Col>
    </Row>
  )
}

export default StoreTab
