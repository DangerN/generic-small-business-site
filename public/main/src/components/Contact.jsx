import React from 'react'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import useControlledContact from '../hooks/useControlledContact'
import useColor from '../hooks/useColor'


const Contact = props => {
  const { name, subject, email, message, submit } = useControlledContact()
  return (
    <Jumbotron className='bg-light' style={{borderTopRadius: '0px'}}>
      <p>
        Please feel free to contact us using the form below.
      </p>
      <Form {...submit}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control {...name} placeholder='Name' />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control {...email} placeholder='Email' type='email' />
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Control {...subject} placeholder='Subject'/>
        </Form.Group>
        <Form.Group>
          <Form.Control {...message} style={{minHeight: '10rem'}} as='textarea' placeholder="Message"/>
        </Form.Group>
        <Button {...useColor('button')} type='submit'>Send!</Button>
      </Form>
    </Jumbotron>
  )
}

export default Contact
