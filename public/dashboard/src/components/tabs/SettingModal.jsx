import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import InputGroup from 'react-bootstrap/InputGroup'

const SettingsModal = props => {
  console.log(props);
  const { show, onHide, meta, catagories, specList } = props
  const [name, setName] = useState(meta.brandname)
  const [tagline, setTagline] = useState(meta.tagline)
  const [activeSpec, setActiveSpec] = useState({})

  // the entire object must be sent as the meta is completely rewritten on each request.
  const handleSubmit = e => {
    console.log('post attempt');
    e.preventDefault()
    props.updateMeta({
      brandname: name,
      brandstyle: props.brandstyle,
      tagline: tagline
    }).then(()=>{
      alert('success!')
      onHide()
    }).catch(console.log)
  }

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Brand Name</Form.Label>
              <InputGroup>
                <Form.Control value={name} />
                <InputGroup.Append>
                <Button>Save</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Tagline</Form.Label>
              <Form.Control as='textarea' value={tagline} />
              <Button>Save</Button>
            </Form.Group>
            <Form.Group>
              <Form.Label>Specifications</Form.Label>
              <Dropdown>
                <Dropdown.Toggle>Select Spec</Dropdown.Toggle>
                <Dropdown.Menu>
                  { specList.map(spec=>{
                    return (
                      <Dropdown.Item key={spec.id} as='button'>
                        {spec.type}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
              <Form.Control as='textarea' value={tagline} />
              <Button>Save</Button>
            </Form.Group>
            <Form.Group>
              <Form.Label>catagories</Form.Label>
              <Form.Control as='textarea' value={tagline} />
              <Button>Save</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal.Header>
    </Modal>
  )
}

export default SettingsModal
