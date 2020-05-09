import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import InputGroup from 'react-bootstrap/InputGroup'

const SettingsModal = props => {
  const { show, onHide } = props
  const [name, setName] = useState(props.brandname)
  const [tagline, setTagline] = useState(props.tagline)
  const [catagories, setCatagories ] = useState(props.catagories)
  const [ selectCat, setSelectCat ] = useState('')
  console.log(catagories);

  // the entire object must be sent as the meta is completely rewritten on each request.
  const handleSubmit = e => {
    e.preventDefault()
    props.updateMeta({
      brandname: name,
      catagories: catagories,
      brandstyle: props.brandstyle,
      tagline: tagline
    }).then(()=>{
      alert('success!')
      onHide()
    }).catch(console.log)
  }

  const handleCatChange = e => {
    setSelectCat(e.target.value)
    setCatagories(prevCats=>{
      let newCats = prevCats
      newCats[e.target.value] = prevCats[selectCat]
      delete newCats[selectCat]
      return newCats
    })
  }

  useEffect(() => {

  },[selectCat])

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Brand Name</Form.Label>
              <Form.Control value={name} onChange={e=>{setName(e.target.value)}} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tagline</Form.Label>
              <Form.Control as='textarea' value={tagline} onChange={e=>{setTagline(e.target.value)}} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Catagories</Form.Label>
              <Form.Control value={selectCat} onChange={handleCatChange}/>
              <Dropdown>
                <Dropdown.Toggle>Catagory</Dropdown.Toggle>
                <Dropdown.Menu style={{overflow: 'hidden'}}>
                  { Object.keys(catagories).map(cat => <Dropdown.Item onClick={()=>setSelectCat(cat)}>{cat}</Dropdown.Item>) }
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Button type='submit'>Save</Button>
          </Form>
        </Modal.Body>
      </Modal.Header>
    </Modal>
  )
}

export default SettingsModal
