import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaUserCircle, FaSearch } from 'react-icons/fa'
import { Navbar, Nav, Form, FormControl, Button, InputGroup } from 'react-bootstrap'

const Navi = props => {
  const { searchTerm, dispatch } = props
  return (
    <Navbar bg="light" expand="lg" style={{height: '8vh', zIndex: '100'}}>
      <Navbar.Brand to='/' as={Link}>GBusiness</Navbar.Brand>
      <Navbar.Toggle style={{zIndex: '101'}} />
      <Navbar.Collapse id='basic-navbar-nav' style={{backgroundColor: 'inherit'}}>
        <Nav className='mr-auto'>
          <Nav.Link to='/about' as={Link} >About</Nav.Link>
          <Nav.Link to='/contact' as={Link} >Contact</Nav.Link>
        </Nav>
        <Form inline>
          <InputGroup>
            <FormControl type="text" placeholder="Search" onChange={e=>dispatch({type: 'updateSearch', payload: e.target.value})} value={searchTerm}/>
            <InputGroup.Append>
              <Button><FaSearch/></Button>
            </InputGroup.Append>
          </InputGroup>
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
