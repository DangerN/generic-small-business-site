import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'


const Login = props => {
  const [ signUp, setSignup ] = useState(false)

  const signInGroup = () => {
    return (
      <InputGroup>
        <InputGroup.Prepend>
          <Button>Sign In</Button>
        </InputGroup.Prepend>
        <InputGroup.Append>
          <Button variant='outline-primary' onClick={()=>setSignup(true)}>Sign Up</Button>
        </InputGroup.Append>
      </InputGroup>
    )
  }

  const signUpGroup = () => {
    return (
      <>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control placeholder='Confirm Password'/>
        </Form.Group>
        <Button >Sign Up</Button>
      </>
    )
  }

  return (
    <Col xs={10} md={{span: 6, offset:3}}>
      <Form>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control placeholder='Enter Email' />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control placeholder='Enter Password'/>
        </Form.Group>
        { signUp ? signUpGroup() : signInGroup()}
      </Form>
    </Col>
  )
}

export default Login
