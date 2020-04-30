import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Login from './Login'


const User = props => {
  const [user, setUser ] = useState(false)
  const [ signUp, setSignup ] = useState(false)

  const login = () => {

  }

  const userDetails = () => {
    return (
      <div>
        im a useer neerd
      </div>
    )
  }

  return (
    <Container>
      <Row>
        { user ? userDetails() : <Login />}
      </Row>
    </Container>
  )
}

export default User
