import React, { useState } from 'react'
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom'
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

  let { path, url } = useRouteMatch()

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
        <Switch>
          <Route exact path={path}>
            {user ? userDetails() : <Redirect to={{pathname: `${path}/login`}} />}
          </Route>
          <Route path={`${path}/login`}>
            <Login />
          </Route>
        </Switch>
      </Row>
    </Container>
  )
}

export default User
