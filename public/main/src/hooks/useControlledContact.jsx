import { useState } from 'react'

export default () => {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ subject, setSubject ] = useState('')
  const [ message, setMessage ] = useState('')
  return {
    name: {
      value: name,
      onChange: event=>setName(event.target.value)
    },
    email: {
      value: email,
      onChange: event=>setEmail(event.target.value)
    },
    subject: {
      value: subject,
      onChange: event=>setSubject(event.target.value)
    },
    message: {
      value: message,
      onChange: event=>setMessage(event.target.value)
    },
    submit: {
      onSubmit: event=>{
        event.preventDefault()
        console.log(event.target);
      },
    }
  }
}
