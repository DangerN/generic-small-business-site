import React, { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { BASE_PATH } from '../constants'

const MessageTab = props => {
  console.log(props);
  const {messages, loaded, getMessages} = props
  const [showMessage, setShowMessage] = useState(false)
  const [currentMess, setCurrentMess] = useState({})

  const openMessage = i => {
    setCurrentMess(messages[i])
    setShowMessage(true)
  }

  const listMessages = () => {
    return messages.map((message, i)=>{
      return (
        <tr key={`mr-row-${message.id}`} onClick={()=>openMessage(i)}>
          <td>{message.name}</td>
          <td>{message.email}</td>
          <td>{message.subject}</td>
          <td>{message.created_at}</td>
        </tr>
      )
    })
  }

  const deleteMess = () => {
    axios({
      method: 'delete',
      url: `${BASE_PATH}/api/messages/${currentMess.id}`
    }).then(()=>{
      getMessages()
      setCurrentMess({})
      setShowMessage(false)
      alert('deleted!')
    }).catch(console.log)
  }

  return (
      <Row>
        <Modal show={showMessage} onHide={()=>setShowMessage(false)}>
          <Modal.Header closeButton>{currentMess.email}</Modal.Header>
          <Modal.Body>
            <p>From: {currentMess.name}</p>
            <p>Subject: {currentMess.subject}</p>
            <p>Recieved: {currentMess.created_at}</p>
            <div>{currentMess.body}</div>
          </Modal.Body>
          <Modal.Footer style={{justifyContent: 'space-between'}}>
            <a href={`mailto:${currentMess.email}?subject=${currentMess.subject}`} ><Button>Email</Button></a>
            <Button onClick={deleteMess}>Delete</Button>
          </Modal.Footer>
        </Modal>
        <Table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Subject</td>
              <td>Recieved</td>
            </tr>
          </thead>
          <tbody>
            { loaded ? listMessages() : null}
          </tbody>
        </Table>
      </Row>
  )
}

export default MessageTab
