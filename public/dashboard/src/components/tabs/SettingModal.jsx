import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import { BASE_PATH } from '../../constants'

const SettingsModal = props => {
  console.log(props);
  const { show, onHide, meta, catagories, specList, getMetaData } = props
  const [name, setName] = useState(meta.brandname)
  const [tagline, setTagline] = useState(meta.tagline)

  const initSpec = {type: '', unit: '', filter: {values: "numeric", method: "range"}}
  const [activeSpec, setActiveSpec] = useState(initSpec)

  const specEditing = () => {
    return activeSpec.id ? {disabled: false} : {disabled: true}
  }

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

  const newSpec = () => setActiveSpec({...initSpec, id: 'new'})

  const saveSpec = () => {
    const specPath = () => activeSpec.id === 'new' ? '' : `/${activeSpec.id}`
    axios({
      method: 'post',
      url: `${BASE_PATH}/api/meta/specs${specPath()}`,
      data: activeSpec
    }).then(()=>{
      alert('success!')
      setActiveSpec(initSpec)
      getMetaData()
    }).catch(err=>{
      console.log(err)
      alert('failure! check the console for details')
    })
  }

  const filterDisplay = {numeric: 'Number', string: 'Text'}[activeSpec.filter.values]

  const handleSpecChange = {
    type: e => setActiveSpec({...activeSpec, type: e.target.value}),
    unit: e => setActiveSpec({...activeSpec, unit: e.target.value}),
    filter: e => {
      e.preventDefault()
      const filterSetting = {
        Number: {values: "numeric", method: "range"},
        Text: {values: "string", method: "list"}
      }[e.target.innerText]
      setActiveSpec({...activeSpec, filter: filterSetting})
    },
  }

  const handleSpecSelect = e => {
    e.preventDefault()
    setActiveSpec(specList.find(spec=>`spec-${spec.id}` === e.target.id))
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
              <Form.Label><h5>Specifications</h5></Form.Label>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control {...specEditing()} onChange={handleSpecChange.type} value={activeSpec.type} />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Unit</Form.Label>
                  <Form.Control {...specEditing()} onChange={handleSpecChange.unit} value={activeSpec.unit} />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Type</Form.Label>
                  <Dropdown >
                    <Dropdown.Toggle {...specEditing()}>{filterDisplay}</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleSpecChange.filter}>Number</Dropdown.Item>
                      <Dropdown.Item onClick={handleSpecChange.filter} >Text</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>

              </Form.Row>
              <Form.Row style={{justifyContent: 'space-between'}}>
                <Dropdown>
                  <Dropdown.Toggle >Select Spec</Dropdown.Toggle>
                  <Dropdown.Menu >
                    { specList.map(spec=>{
                      return (
                        <Dropdown.Item key={`spec-${spec.id}`} id={`spec-${spec.id}`} onClick={handleSpecSelect} as='button'>
                          {spec.type}
                        </Dropdown.Item>
                      )
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                <Button onClick={saveSpec} {...specEditing()}>Save</Button>
                <Button onClick={newSpec}>New</Button>
                <Button disabled={true}>Delete</Button>
              </Form.Row>
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
