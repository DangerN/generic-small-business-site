import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import useStore from './hooks/useStore'
import Navi from './components/Navi'
import Landing from './components/Landing'
import Cart from './components/Cart'
import Contact from './components/Contact'
import About from './components/About'
import Store from './components/Store'
import User from './components/User'
import NotFoundPage from './components/NotFoundPage'
import './App.css';

const BASE_PATH = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000'

function App() {
  const [ state, dispatch ] = useStore()

  useEffect(() => {
    axios(`${BASE_PATH}/api/store/products`)
    .then(({data})=>dispatch({type: 'setProducts', payload: data}))
  },[dispatch])

  return (
    <div className="App">
      <Router>
        <Navi {...state} dispatch={dispatch} />
        <Switch>
          <Route exact path='/'>
            <Landing {...state} dispatch={dispatch} />
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
          <Route exact path='/user'>
            <User />
          </Route>
          <Route path='/store'>
            <Store {...state} dispatch={dispatch} />
          </Route>
          <Route >
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
