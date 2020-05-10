import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import { TiDelete } from 'react-icons/ti'
import { BASE_PATH } from '../../constants'


const SettingsModal = props => {
  console.log(props);
  const { show, onHide, meta, catagories, specList, getMetaData, catagoryList } = props

  const [ alert, setAlert ] = useState({props: {show: false}})
  const alertDeets = {
    success: {
      text: 'Success!',
      props: {
        show: true,
        variant: 'success'
      }
    },
    failure: {
      text: 'Failed to update. Dunno lol.!',
      props: {
        show: true,
        variant: 'danger'
      }
    },
    autoClose: () => setTimeout(()=>setAlert({props: {show: false}}),3000)
  }

  const [name, setName] = useState(meta.brandname)
  const [tagline, setTagline] = useState(meta.tagline)

  const initSpec = {type: '', unit: '', filter: {values: "numeric", method: "range"}}
  const [activeSpec, setActiveSpec] = useState(initSpec)

  const initCat = {name: ''}
  const [activeCat, setActiveCat] = useState(initCat)
  const initCatSpecs = []
  const [activeCatSpecs, setActiveCatSpecs] = useState(initCatSpecs)

  const newCat = () => {
    setActiveCat({...initCat, id: 'new', name: 'New Catagory'})
    setActiveCatSpecs(initCatSpecs)
  }

  const handleCatSelect = e => {
    e.preventDefault()
    setActiveCat(catagoryList.find(cat=>`cat-${cat.id}` === e.target.id))
    setActiveCatSpecs(catagories.find(cat=>`cat-${cat.id}` === e.target.id).catagory_specs)
  }

  const handleCatChange = {
    name: e => setActiveCat({...activeCat, name: e.target.value}),
    addSpec: spec => setActiveCatSpecs([...activeCatSpecs, spec]),
    removeSpec: index => {
      const newCatSpecs = [...activeCatSpecs]
      newCatSpecs.splice(index, 1)
      setActiveCatSpecs(newCatSpecs)
    }
  }

  const saveCat = () => {
    const catPath = () => activeCat.id === 'new' ? '' : `/${activeCat.id}`
    const catData = {
      catagory: activeCat,
      specs: activeCatSpecs
    }
    axios({
      method: 'post',
      url: `${BASE_PATH}/api/meta/catagories${catPath()}`,
      data: catData
    }).then(()=>{
      setAlert(alertDeets.success)
      alertDeets.autoClose()
      setActiveCat(initCat)
      setActiveCatSpecs(initCatSpecs)
      getMetaData()
    }).catch(err=>{
      console.log(err)
      setAlert(alertDeets.failure)
      alertDeets.autoClose()
    })
  }

  const specEditing = () => {
    return activeSpec.id ? {disabled: false} : {disabled: true}
  }

  const catEditing = () => {
    return activeCat.id ? {disabled: false} : {disabled: true}
  }

  const newSpec = () => setActiveSpec({...initSpec, id: 'new', type: 'New Spec'})

  const saveSpec = () => {
    const specPath = () => activeSpec.id === 'new' ? '' : `/${activeSpec.id}`
    axios({
      method: 'post',
      url: `${BASE_PATH}/api/meta/specs${specPath()}`,
      data: activeSpec
    }).then(()=>{
      setAlert(alertDeets.success)
      alertDeets.autoClose()
      setActiveSpec(initSpec)
      getMetaData()
    }).catch(err=>{
      console.log(err)
      setAlert(alertDeets.failure)
      alertDeets.autoClose()
    })
  }

  const filterDisplay = {numeric: 'Number', string: 'Text'}[activeSpec.filter.values]

  const handleSpecChange = {
    type: e => setActiveSpec({...activeSpec, type: e.target.value}),
    unit: e => setActiveSpec({...activeSpec, unit: e.target.value}),
    filter: e => {
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

  const saveNameAndTag = () => {
    axios({
      method: 'post',
      url: `${BASE_PATH}/api/meta`,
      data: {
        brandname: name,
        brandstyle: meta.brandstyle,
        tagline: tagline
      }
    }).then(()=>{
      setAlert(alertDeets.success)
      alertDeets.autoClose()
      getMetaData()
    }).catch(err=>{
      setAlert(alertDeets.failure)
      alertDeets.autoClose()
    })
  }

  return (
    <Modal show={show} size='lg' onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Body>
          <Alert {...alert.props} >{alert.text}</Alert>
          <Form onSubmit={e=>e.preventDefault()}>
            <Form.Group>
              <Form.Label><h5>Brand Name</h5></Form.Label>
              <InputGroup>
                <Form.Control value={name} onChange={e=>setName(e.target.value)} />
                <InputGroup.Append>
                  <Button onClick={saveNameAndTag}>Save</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label><h5>Tagline</h5></Form.Label>
              <Form.Control as='textarea' style={{minHeight: '7rem'}} onChange={e=>{setTagline(e.target.value)}} value={tagline} />
              <Form.Group style={{display: 'flex', justifyContent: 'flex-end', marginTop: '.5rem'}}>
                <Button onClick={saveNameAndTag}>Save</Button>
              </Form.Group>
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
              <Form.Row style={{justifyContent: 'space-around'}}>
                <Dropdown>
                  <Dropdown.Toggle >Specification</Dropdown.Toggle>
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
              <Form.Label><h5>Catagories</h5></Form.Label>
              <Form.Row style={{justifyContent: 'space-around'}}>
                <Form.Group>
                  <Dropdown>
                    <Dropdown.Toggle>Catagory</Dropdown.Toggle>
                    <Dropdown.Menu>
                      { catagoryList.map( cat => {
                        return (
                          <Dropdown.Item key={`cat-${cat.id}`} id={`cat-${cat.id}`} onClick={handleCatSelect} as='button'>
                            {cat.name}
                          </Dropdown.Item>
                        )
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
                <Form.Group>
                  <Button onClick={saveCat} {...catEditing()}>Save</Button>
                </Form.Group>
                <Form.Group>
                  <Button onClick={newCat}>New</Button>
                </Form.Group>
                <Form.Group>
                  <Button disabled={true}>Delete</Button>
                </Form.Group>
              </Form.Row>

              <Form.Row style={{justifyContent: 'space-around'}}>
                <Form.Group >
                  <Form.Label>Name</Form.Label>
                  <Form.Control {...catEditing()} value={activeCat.name} onChange={handleCatChange.name} />
                </Form.Group>
                <Form.Group style={{display: 'flex', alignItems: 'center'}} >
                  <Dropdown>
                    <Dropdown.Toggle {...catEditing()}>Add Spec</Dropdown.Toggle>
                    <Dropdown.Menu>
                      { specList.map( spec => {
                        return (
                          <Dropdown.Item key={`cat-spec-${spec.id}`} id={`cat-spec-${spec.id}`} onClick={()=>handleCatChange.addSpec(spec)} as='button'>
                            {spec.type}
                          </Dropdown.Item>
                        )
                      }) }
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>

              </Form.Row>
              <Form.Row>
                { activeCatSpecs.map((spec, i)=>{
                  return (
                    <>
                      <Button variant='outline-primary' key={`spec-btn-${spec.id}`} size='sm' style={{marginRight: '.5rem'}} onClick={()=>handleCatChange.removeSpec(i)}>
                        {spec.type}
                        <TiDelete size={20} />
                      </Button>
                    </>
                  )
                }) }
              </Form.Row>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal.Header>
    </Modal>
  )
}

export default SettingsModal
