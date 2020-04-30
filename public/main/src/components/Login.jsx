import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const Login = props => {
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
        <Form.Group>
          <Button >Sign In</Button>
          <Form.Text>Sign Up</Form.Text>
        </Form.Group>
      </Form>
    </Col>
  )
}

export default Login
