import React, { useEffect } from 'react';
import { useRoutes } from 'hookrouter'
import axios from 'axios'
import useStore from './hooks/useStore'
import Navi from './components/Navi'
import Landing from './components/Landing'
import Cart from './components/Cart'
import Contact from './components/Contact'
import About from './components/About'
import NotFoundPage from './components/NotFoundPage'
import './App.css';

const routes = {
  '/': () => props => <Landing {...props} />,
  '/cart': () => props => <Cart />,
  '/contact': () => props => <Contact />,
  '/about': () => props => <About />
}

const BASE_PATH = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000'

function App() {
  const [ state, dispatch ] = useStore()
  const route = useRoutes(routes)

  useEffect(() => {
    axios(`${BASE_PATH}/api/store/products`)
    .then(({data})=>dispatch({type: 'setProducts', payload: data}))
  },[])

  return (
    <div className="App">
      <Navi />
      { route({...state, dispatch: dispatch}) || <NotFoundPage /> }
    </div>
  );
}

export default App;
