import React from 'react'
import { Link } from 'react-router-dom'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { FaSearch } from 'react-icons/fa'

import useColor from '../hooks/useColor'

const Landing = props => {
  const { searchTerm, dispatch, brandname, brandstyle, tagline } = props
  return (
    <>
      <Jumbotron className='bg-light'>
        <h2 style={{textAlign: 'center', ...brandstyle}}>{brandname}</h2>
        <p style={{textAlign: 'center'}}>{tagline}</p>
        <p style={{textAlign: 'center'}}>Background by <a {...useColor('link')} href='https://unsplash.com/@monaeendra?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Mona Eendra</a> on <a href='https://unsplash.com/s/photos/longboard?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' {...useColor('link')}>Unsplash</a></p>
      </Jumbotron>
      <Form onSubmit={'handleSearch'}>
        <InputGroup>
          <FormControl {...useColor('input')} value={searchTerm} onChange={e=>dispatch({type: 'updateSearch', payload: e.target.value})}/>
          <InputGroup.Append>
            <Button {...useColor('button')}><FaSearch/></Button>
            <Button as={Link} to='/store' {...useColor('button')}>Browse</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </>
  )
}

export default Landing
