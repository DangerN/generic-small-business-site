import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { FaSearch } from 'react-icons/fa'

const Landing = props => {
  const { searchTerm, dispatch } = props
  return (
    <>
      <br/>
      <h2 style={{textAlign: 'center'}}>Some big text</h2>
      <br/>
      <p style={{textAlign: 'center'}}>Some smaller details, maybe a quote</p>
      <br/>
      <p style={{textAlign: 'center'}}>Background by <a href='https://unsplash.com/@monaeendra?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Mona Eendra</a> on <a href='https://unsplash.com/s/photos/longboard?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Unsplash</a></p>
      <Form onSubmit={'handleSearch'}>
        <InputGroup>
          <FormControl value={searchTerm} onChange={e=>dispatch({type: 'updateSearch', payload: e.target.value})}/>
          <InputGroup.Append>
            <Button><FaSearch/></Button>
            <Button as={Link} to='/store' >Browse</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </>
  )
}

export default Landing
