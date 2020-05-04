import React from 'react'
import { Link } from 'react-router-dom'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { FaSearch } from 'react-icons/fa'

const Landing = props => {
  const { searchTerm, dispatch, brandName, brandStyle } = props
  return (
    <>
      <Jumbotron className='bg-light'>
        <h2 style={{textAlign: 'center', ...brandStyle}}>{brandName}</h2>
        <p style={{textAlign: 'center'}}>Some smaller details, maybe a quote</p>
        <p style={{textAlign: 'center'}}>Background by <a href='https://unsplash.com/@monaeendra?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Mona Eendra</a> on <a href='https://unsplash.com/s/photos/longboard?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Unsplash</a></p>
      </Jumbotron>
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
