import React, { useState } from 'react'
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom'
import Row from 'react-bootstrap/Row'

import Login from './Login'


const User = props => {
  // eslint-disable-next-line
  const [user, setUser ] = useState(false)

  // eslint-disable-next-line
  let { path, url } = useRouteMatch()

  const userDetails = () => {
    return (
      <div>
        im a useer neerd
      </div>
    )
  }

  return (
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
  )
}

export default User
