import React from 'react';
import { useRoutes } from 'hookrouter'
import Container from 'react-bootstrap/Container'
import Navi from './components/Navi'
import Landing from './components/Landing'
import Cart from './components/Cart'
import Contact from './components/Contact'
import About from './components/About'
import NotFoundPage from './components/NotFoundPage'
import './App.css';

const routes = {
  '/': () => <Landing />,
  '/cart': () => <Cart />,
  '/contact': () => <Contact />,
  '/about': () => <About />
}

function App() {
  const route = useRoutes(routes)
  return (
    <div className="App">
      <Navi />
      <Container>
        { route || <NotFoundPage /> }
      </Container>
    </div>
  );
}

export default App;
