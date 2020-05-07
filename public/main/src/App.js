import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import useStore from './hooks/useStore'
import useMeta from './hooks/useMeta'
import Navi from './components/Navi'
import Landing from './components/Landing'
import Cart from './components/Cart'
import Contact from './components/Contact'
import About from './components/About'
import Store from './components/Store'
import User from './components/User'
import NotFoundPage from './components/NotFoundPage'

const BASE_PATH = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000'

const BACK_IMG = {
  backgroundImage: `url(${BASE_PATH}/api/images/background)`,
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  backgroundColor: '#464646'
}

function App() {
  const [ state, dispatch ] = useStore()
  const [ metaState, metaDispatch ] = useMeta()

  useEffect(() => {
    axios(`${BASE_PATH}/api/meta`)
    .then(({data})=>metaDispatch({type: 'dumpMeta', payload: data}))
    axios(`${BASE_PATH}/api/store/products`)
    .then(({data})=>dispatch({type: 'setProducts', payload: data}))
  },[dispatch, metaDispatch])

  return (
    <div className="App" style={BACK_IMG}>
      <Router>
        <Navi {...state} {...metaState} dispatch={dispatch} />
        <Container style={{height: '92vh'}}>
          <Switch>
            <Route exact path='/'>
              <Landing {...state} {...metaState} dispatch={dispatch} />
            </Route>
            <Route exact path='/about'>
              <About />
            </Route>
            <Route exact path='/contact'>
              <Contact />
            </Route>
            <Route exact path='/cart'>
              <Cart />
            </Route>
            <Route path='/user'>
              <User />
            </Route>
            <Route path='/store'>
              <Store {...state} dispatch={dispatch} />
            </Route>
            <Route >
              <NotFoundPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
