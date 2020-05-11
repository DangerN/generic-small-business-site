import React, {useEffect, useState, useCallback} from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Container from 'react-bootstrap/Container'
import StoreTab from './components/tabs/StoreTab'
import MessageTab from './components/MessageTab'
import axios from 'axios'
import useStore from './hooks/useStore'
import useMeta from './hooks/useMeta'
import useMessages from './hooks/useMessages'

const BASE_PATH = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000'

function App() {
  const [ storeState, storeDispatch ] = useStore()
  const [ metaState, metaDispatch ] = useMeta()
  const [ messagesState, messagesDispatch ] = useMessages()
  const [ loaded, setLoaded ] = useState(false)

  const getMetaData = useCallback(
    () => {
      axios(`${BASE_PATH}/api/store/products`)
      .then(({data})=>storeDispatch({type: 'setProducts', payload: data}))
      axios(`${BASE_PATH}/api/meta`)
      .then(({data})=>metaDispatch({type: 'dumpMeta', payload: data}))
      axios(`${BASE_PATH}/api/meta/spec-list`)
      .then(({data})=>metaDispatch({type: 'specList', payload: data}))
      axios(`${BASE_PATH}/api/meta/catagory-list`)
      .then(({data})=>metaDispatch({type: 'catagoryList', payload: data}))
    },
    [storeDispatch, metaDispatch]
  )

  const getMessages = useCallback(
    () => {
      axios(`${BASE_PATH}/api/messages`)
      .then(({data})=>messagesDispatch({type: 'dumpMessages', payload: data}))
    },
    [messagesDispatch]
  )




  useEffect(() => {
    getMetaData()
    getMessages()
  },[getMessages, getMetaData])

  // ensure data is loaded before rendering
  useEffect(() => {
    metaState.meta && metaState.specList && metaState.catagoryList && messagesState.messages && setLoaded(true)
  },[metaState, messagesState])



  const updateProduct = product => {
    axios({
      method: 'post',
      url: `${BASE_PATH}/api/store/products/${product.id}`,
      data: product
    }).then(console.log)
  }

  const updateMeta = newMeta => {
    return new Promise(function(resolve, reject) {
      axios({
        method: 'post',
        url: `${BASE_PATH}/api/meta`,
        data: newMeta
      }).then(({data})=>{
        metaDispatch({type: 'dumpMeta', payload: data})
        resolve()
      }).catch(reject)
    });
  }

  return (
    <Container>
      <Tabs defaultActiveKey="store">
        <Tab eventKey="store" title="Store">
          <StoreTab
            getMetaData={getMetaData}
            loaded={loaded}
            updateProduct={updateProduct}
            {...storeState}
            updateMeta={updateMeta}
            {...metaState}
          />
        </Tab>
        <Tab eventKey="messages" title="Messages">
          <MessageTab {...messagesState} loaded={loaded} getMessages={getMessages} />
        </Tab>
        <Tab eventKey="orders" title="Orders">
          Orders
        </Tab>
      </Tabs>
    </Container>
  );
}

export default App;
