import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

const Navi = props => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand to='/' as={Link}>GBusiness</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link to='/about' as={Link} >About</Nav.Link>
          <Nav.Link to='/contact' as={Link} >Contact</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Nav>
          <Nav.Link as={Link} to='/cart' ><FaShoppingCart size='38'/></Nav.Link>
          <Nav.Link to='/user' as={Link} ><FaUserCircle/><div>Sign In</div></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navi
