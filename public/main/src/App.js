import React, { useEffect, useState } from 'react';
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
  const [ loaded, setLoaded ] = useState(false)

  useEffect(() => {
    axios(`${BASE_PATH}/api/meta`)
    .then(({data})=>metaDispatch({type: 'dumpMeta', payload: data}))
    axios(`${BASE_PATH}/api/store/products`)
    .then(({data})=>dispatch({type: 'setProducts', payload: data}))
    axios(`${BASE_PATH}/api/meta/spec-list`)
    .then(({data})=>metaDispatch({type: 'specList', payload: data}))
    axios(`${BASE_PATH}/api/meta/catagory-list`)
    .then(({data})=>metaDispatch({type: 'catagoryList', payload: data}))
  },[dispatch, metaDispatch])

  useEffect(() => {
    metaState.meta && state.products && setLoaded(true)
  }, [state, metaState])

  const execSearch = () => {
    state.products.forEach((product, idx) => {
      let weight = 0
      if(product.name.includes(state.searchTerm)) {weight += 1}
      if(product.description.includes(state.searchTerm)) {weight += 1}
      let specVals = Object.keys(product.specs_values)
      for (var i = 0; i < specVals.length; i++) {
        if(specVals[i].includes(state.searchTerm)) {weight += 1}
      }
      dispatch({type: 'weightProduct', payload: {index: idx, product: product}})
    })

  }

  console.log(state.products);

  return (
    <div className="App" style={BACK_IMG}>
      <Router>
        { loaded ? <Navi {...state} {...metaState} dispatch={dispatch} /> : null}
        <Container style={{height: '92vh'}}>
          <Switch>
            <Route exact path='/'>
              { loaded ? <Landing {...state} {...metaState} dispatch={dispatch} /> : null}
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
              { loaded ? <Store {...state} {...metaState} dispatch={dispatch} /> : null}
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
