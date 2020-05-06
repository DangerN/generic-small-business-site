import React, {useEffect} from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Container from 'react-bootstrap/Container'
import StoreTab from './components/tabs/StoreTab'
import axios from 'axios'
import useStore from './hooks/useStore'

const BASE_PATH = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000'

function App() {
  const [ storeState, storeDispatch ] = useStore()

  useEffect(() => {
    axios(`${BASE_PATH}/api/store/products`)
    .then(({data})=>storeDispatch({type: 'setProducts', payload: data}))
  },[storeDispatch])

  return (
    <Container>
      <Tabs defaultActiveKey="store">
        <Tab eventKey="store" title="Store">
          <StoreTab {...storeState}/>
        </Tab>
        <Tab eventKey="messages" title="Messages">
          Yeet
        </Tab>
        <Tab eventKey="orders" title="Orders">
          Orders
        </Tab>
      </Tabs>
    </Container>
  );
}

export default App;
