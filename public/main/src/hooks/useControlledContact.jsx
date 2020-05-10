import { useState } from 'react'
import axios from 'axios'
import { BASE_PATH } from '../constants'

export default () => {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ subject, setSubject ] = useState('')
  const [ message, setMessage ] = useState('')

  const initAlert = {props: {show:false}}
  const [ alert, setAlert ] = useState(initAlert)

  const resetForm = () => {
    setName('')
    setEmail('')
    setSubject('')
    setMessage('')
  }

  const alertDeets = {
    success: {
      message: 'Your message has been recieved, someone will contact you shortly.',
      props:  {
        show: true,
        variant: 'success'
      }
    },
    failure: {
      message: 'Something went wrong. Please try again later',
      props:  {
        show: true,
        variant: 'danger'
      }
    }
  }

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
        axios({
          method: 'post',
          url: `${BASE_PATH}/api/messages`,
          data: {
            name: name,
            email: email,
            subject: subject,
            body: message
          }
        }).then(()=>{
          setAlert(alertDeets.success)
          setTimeout(()=>setAlert(initAlert), 3000)
          resetForm()
        }).catch(()=>{
          setAlert(alertDeets.failure)
          setTimeout(()=>setAlert(initAlert), 3000)
        })
      }
    },
    alert: alert
  }
}
