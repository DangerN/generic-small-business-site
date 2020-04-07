import React from 'react';
import Navi from './components/Navi'
import Landing from './components/Landing'
import NotFoundPage from './components/NotFoundPage'
import './App.css';
import { useRoutes } from 'hookrouter'
// import { Button, Card, Row, Col } from 'react-materialize';

const routes = {
  '/': () => <Landing />,
}

function App() {
  const route = useRoutes(routes)
  return (
    <div className="App">
      <Navi />
      { route || <NotFoundPage /> }
    </div>
  );
}

export default App;
