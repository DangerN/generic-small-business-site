import React from 'react'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { FaSearch } from 'react-icons/fa'

const Landing = props => {
  const { searchTerm, dispatch } = props
  return (
    <Container>
      <br/>
      <h2 style={{textAlign: 'center'}}>Some big text</h2>
      <br/>
      <p style={{textAlign: 'center'}}>Some smaller details, maybe a quote</p>
      <br/>
      <Form onSubmit={'handleSearch'}>
        <InputGroup>
          <FormControl value={searchTerm} onChange={e=>dispatch({type: 'updateSearch', payload: e.target.value})}/>
          <InputGroup.Append>
            <Button><FaSearch/></Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </Container>
  )
}

export default Landing
