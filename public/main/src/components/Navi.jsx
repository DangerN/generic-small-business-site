import React from 'react'
import { A } from 'hookrouter'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

const Navi = props => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href='/' as={A}>GBusiness</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='/about' as={A} >About</Nav.Link>
          <Nav.Link href='/contact' as={A} >Contact</Nav.Link>
        </Nav>
        <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navi
